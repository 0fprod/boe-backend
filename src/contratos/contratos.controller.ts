import { Controller, Get, HttpException, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContratoDTO } from '../compartido/dto/contrato.dto';
import { Contrato } from '../compartido/models';
import { ContratosService } from './contratos.service';

@ApiTags('Contratos')
@Controller('contratos')
export class ContratosController {
  constructor(private contratosService: ContratosService) {}

  @ApiResponse({
    status: 200,
    description: 'Contrato',
    type: ContratoDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador de un contrato formalizado',
    format: 'BOE-B-AAAA-XXXX',
  })
  @ApiOperation({
    summary: 'Devuelve un contrato a partir de un id',
  })
  @Get('/contrato/:id')
  async getId(@Param() params): Promise<Contrato> {
    const { id } = params;
    const contrato = await this.contratosService.obtenerContratoPorId(id);

    if (contrato) {
      return contrato;
    }

    throw new HttpException('El contrato no existe', HttpStatus.NOT_FOUND);
  }

  @ApiResponse({
    status: 200,
    description: 'Contrato',
    type: ContratoDTO,
    isArray: true,
  })
  @ApiResponse({ status: 400, description: 'El formato de fecha debe ser YYYY-MM-DD.' })
  @ApiQuery({
    name: 'fechaInicio',
    description: 'Fecha de inicio del rango',
    example: '2020-05-06',
    required: true,
  })
  @ApiQuery({
    name: 'fechaFin',
    example: '2020-05-12',
    description: 'Fecha final del rango',
    required: false,
  })
  @Get('/rango')
  @ApiOperation({
    summary: 'Devuelve un listado de contratos en un rango de una fecha o rango de fechas',
  })
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
