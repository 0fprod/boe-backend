import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContratoDTO } from './dto/contrato.dto';
import { mapDocumentAContrato } from './mappers/contrato.mapper';
import { Contrato } from './models';
import { ContratoDoc, ContratoEntity } from './schema/contrato.schema';

@Injectable()
export class ContratoRepository {
  constructor(@InjectModel(ContratoEntity.name) private contratoModel: Model<ContratoDoc>) {}

  async create(contrato: Contrato): Promise<ContratoDTO> {
    const contratoDoc = await this.contratoModel.create({ ...contrato });

    return mapDocumentAContrato(contratoDoc);
  }
}
