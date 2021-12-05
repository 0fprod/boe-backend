import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContratoDoc, ContratoEntity } from '../compartido/schema/contrato.schema';
import { EstadisticaApiModel } from './models/api.model';

@Injectable()
export class EstadisticasRepository {
  constructor(@InjectModel(ContratoEntity.name) private contratoModel: Model<ContratoDoc>) {}

  async estadisticasPyme(fechaPubInicio: string, fechaPubFin: string): Promise<EstadisticaApiModel[]> {
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
        // Agrupamos por PYME/NoPyme y total de gastos
        $group: {
          _id: '$detalles.beneficiarios.esPyme',
          total: { $sum: '$detalles.beneficiarios.coste' },
        },
      },
    ]);

    return contratoDoc;
  }

  async estadisticasPorActividad(fechaPubInicio: string, fechaPubFin: string): Promise<EstadisticaApiModel[]> {
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
        // Agrupamos por actividad de la institución y total de gastos
        $group: {
          _id: '$detalles.institucion.actividad',
          total: { $sum: '$detalles.beneficiarios.coste' },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    return contratoDoc;
  }

  async getTopBeneficiariosPorFecha(fechaPubInicio: string, fechaPubFin: string): Promise<EstadisticaApiModel[]> {
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
          total: { $sum: 1 },
        },
      },
      {
        // Filtramos las que aparezca más de una vez
        $match: {
          total: { $gt: 1 },
        },
      },
      {
        // Ordenamos de mayor a menor
        $sort: {
          total: -1,
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
