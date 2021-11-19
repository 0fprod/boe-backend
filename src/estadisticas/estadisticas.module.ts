import { Module } from '@nestjs/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { EstadisticasController } from './estadisticas.controller';
import { EstadisticasService } from './estadisticas.service';

@Module({
  controllers: [EstadisticasController],
  imports: [CompartidoModule],
  providers: [EstadisticasService],
})
export class EstadisticasModule {}
