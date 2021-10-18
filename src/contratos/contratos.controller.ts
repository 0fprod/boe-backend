import { Controller, Get } from '@nestjs/common';
import { ContratosService } from './contratos.service';

@Controller('contratos')
export class ContratosController {
  constructor(private contratosService: ContratosService) {}

  @Get()
  getId(): string {
    return this.contratosService.getHello();
  }

  @Get()
  getRangoDeFecha(): string {
    return this.contratosService.getHello();
  }
}
