import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { Contrato } from '../compartido/models';
import { ContratosService } from './contratos.service';

@Controller('contratos')
export class ContratosController {
  constructor(private contratosService: ContratosService) {}

  @Get('/contrato/:id')
  async getId(@Param() params): Promise<Contrato> {
    const { id } = params;
    const contrato = await this.contratosService.obtenerContratoPorId(id);

    if (contrato) {
      return contrato;
    }

    throw new HttpException('El contrato no existe', HttpStatus.NOT_FOUND);
  }

  @Get('/rango')
  getRangoDeFecha(@Query() query): Promise<Contrato[]> {
    const { fechaInicio, fechaFin } = query;

    if (fechaFin !== undefined && this.fechaValida(fechaFin) && this.fechaValida(fechaInicio)) {
      return this.contratosService.obtenerContratoPorRangoFecha(fechaInicio, fechaFin);
    }

    if (this.fechaValida(fechaInicio)) {
      return this.contratosService.obtenerContratoPorFecha(fechaInicio);
    }

    throw new HttpException('El formato de fecha debe ser YYYY-MM-DD.', HttpStatus.BAD_REQUEST);
  }

  private fechaValida(fecha: string): boolean {
    const formato = /^\d{4}-\d{2}-\d{2}$/;
    return formato.test(fecha);
  }
}
