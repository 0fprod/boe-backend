import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { Contrato } from '../compartido/models';
import { ContratosService } from './contratos.service';

@Controller('contratos')
export class ContratosController {
  constructor(private contratosService: ContratosService) {}

  @Get(':id')
  async getId(@Param() params): Promise<Contrato> {
    const { id } = params;
    const contrato = await this.contratosService.obtenerContratoPorId(id);

    if (contrato) {
      return contrato;
    }

    throw new NotFoundException();
  }

  @Get()
  getRangoDeFecha(): string {
    throw new Error('To be implemented');
  }
}
