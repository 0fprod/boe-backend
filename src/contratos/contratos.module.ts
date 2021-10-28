import { Module } from '@nestjs/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

@Module({
  controllers: [ContratosController],
  imports: [CompartidoModule],
  providers: [ContratosService],
})
export class ContratosModule {}
