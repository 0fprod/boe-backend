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

  async getContratoPorId(contratoId: string): Promise<Contrato> {
    const contratoDoc = await this.contratoModel.findOne({ contratoId });

    if (contratoDoc) {
      return mapDocumentAContrato(contratoDoc);
    }

    return null;
  }

  async getContratoPorFecha(fechaPub: string): Promise<Contrato[]> {
    const contratoDoc = await this.contratoModel.find({ fechaPub });

    return contratoDoc.map(mapDocumentAContrato);
  }

  async getContratoPorRangoDeFecha(fechaPubInicio: string, fechaPubFin: string): Promise<Contrato[]> {
    const contratoDoc = await this.contratoModel.find({
      fechaPub: {
        $gte: fechaPubInicio,
        $lte: fechaPubFin,
      },
    });

    return contratoDoc.map(mapDocumentAContrato);
  }
}
