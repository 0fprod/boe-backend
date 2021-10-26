import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BoeApiService } from './boe-api.service';
import { ContratoRepository } from './contrato.repository';
import { ContratoEntity, ContratoSchema } from './schema/contrato.schema';
import { Xml2jsonService } from './xml2json.service';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
  providers: [BoeApiService, ConfigService, Xml2jsonService, ContratoRepository],
  exports: [HttpModule, BoeApiService, ConfigService, Xml2jsonService, ContratoRepository],
})
export class CompartidoModule {}
