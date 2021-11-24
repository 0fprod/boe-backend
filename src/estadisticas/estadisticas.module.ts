import { Module } from '@nestjs/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasRepository } from './estadisticas.repository';
import { EstadisticasService } from './estadisticas.service';

@Module({
  controllers: [EstadisticasController],
  imports: [CompartidoModule],
  providers: [EstadisticasService, EstadisticasRepository],
})
export class EstadisticasModule {}
