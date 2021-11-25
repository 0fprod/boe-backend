import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompartidoModule } from '../compartido/compartido.module';
import { ContratoEntity, ContratoSchema } from '../compartido/schema/contrato.schema';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasRepository } from './estadisticas.repository';
import { EstadisticasService } from './estadisticas.service';

@Module({
  controllers: [EstadisticasController],
  imports: [CompartidoModule, MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
  providers: [EstadisticasService, EstadisticasRepository],
})
export class EstadisticasModule {}
