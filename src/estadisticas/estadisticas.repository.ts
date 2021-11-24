import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContratoDoc, ContratoEntity } from '../compartido/schema/contrato.schema';

@Injectable()
export class EstadisticasRepository {
  constructor(@InjectModel(ContratoEntity.name) private contratoModel: Model<ContratoDoc>) {}

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
