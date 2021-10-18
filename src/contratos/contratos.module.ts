import { Module } from '@nestjs/common';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

@Module({
  controllers: [ContratosController],
  providers: [ContratosService],
})
export class ContratosModule {}
