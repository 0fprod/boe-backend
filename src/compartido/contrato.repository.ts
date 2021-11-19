import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { mapDocumentAContrato } from './mappers/contrato.mapper';
import { Contrato } from './models';
import { ContratoDoc, ContratoEntity } from './schema/contrato.schema';

@Injectable()
export class ContratoRepository {
  constructor(@InjectModel(ContratoEntity.name) private contratoModel: Model<ContratoDoc>) {}

  async guardarContrato(contrato: Contrato): Promise<Contrato> {
    const yyyy = new Date().getFullYear();
    const mm = new Date().getUTCMonth();
    const dd = new Date().getUTCDay();
    const contratoDoc = await this.contratoModel.create({ ...contrato, fechaInsercion: new Date(Date.UTC(yyyy, mm, dd)).toISOString() });

    return mapDocumentAContrato(contratoDoc);
  }

  async guardarContratos(contratos: Contrato[]): Promise<number> {
    const yyyy = new Date().getFullYear();
    const mm = new Date().getUTCMonth();
    const dd = new Date().getUTCDay();
    const contratosConFecha = contratos.map((c) => {
      c.fechaInsercion = new Date(Date.UTC(yyyy, mm, dd)).toISOString();
      return c;
    });

    const contratosGuardados = await this.contratoModel.insertMany(contratosConFecha);
    return contratosGuardados.length;
  }

  async obtenerContratoPorId(contratoId: string): Promise<Contrato> {
    const contratoDoc = await this.contratoModel.findOne({ contratoId });

    if (contratoDoc) {
      return mapDocumentAContrato(contratoDoc);
    }

    return null;
  }

  async obtenerContratoPorFecha(fechaPub: string): Promise<Contrato[]> {
    const contratoDoc = await this.contratoModel.find({ fechaPub });

    return contratoDoc.map(mapDocumentAContrato);
  }

  async obtenerContratoPorRangoDeFecha(fechaPubInicio: string, fechaPubFin: string): Promise<Contrato[]> {
    const contratoDoc = await this.contratoModel.find({
      fechaPub: {
        $gte: fechaPubInicio,
        $lte: fechaPubFin,
      },
    });

    return contratoDoc.map(mapDocumentAContrato);
  }

  async obtenerTopBeneficiariosPorFecha(fechaPubInicio: string, fechaPubFin: string): Promise<any[]> {
    const contratoDoc = await this.contratoModel.aggregate([
      {
        // Filtramos por rango de fecha
        $match: {
          fechaPub: {
            $gte: fechaPubInicio,
            $lte: fechaPubFin,
          },
        },
      },
      {
        // Extraemos un document por cada beneficiario
        $unwind: {
          path: '$detalles.beneficiarios',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        // Agrupamos por nombre y numero de apariciones
        $group: {
          _id: '$detalles.beneficiarios.nombre',
          numVeces: { $sum: 1 },
        },
      },
      {
        // Filtramos las que aparezca más de una vez
        $match: {
          numVeces: { $gt: 1 },
        },
      },
      {
        // Ordenamos de mayor a menor
        $sort: {
          numVeces: -1,
        },
      },
      {
        // Nos quedamos con las 10 primeras
        $limit: 10,
      },
    ]);

    return contratoDoc;
  }
}
