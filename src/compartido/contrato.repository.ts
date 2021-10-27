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
    const contratoDoc = await this.contratoModel.create({ ...contrato, fechaInsercion: new Date().toISOString() });

    return mapDocumentAContrato(contratoDoc);
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
}
