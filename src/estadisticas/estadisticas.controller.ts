import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EstadisticasBeneficiario } from '../swagger/dto/estadisticas.dto';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasBeneficiarios } from './models/estadisticas.model';

@ApiTags('Estadisticas')
@Controller('estadisticas')
export class EstadisticasController {
  constructor(private estadisticasService: EstadisticasService) {}

  @ApiResponse({
    status: 200,
    description: 'EstatisticasBeneficiarios',
    type: EstadisticasBeneficiario,
  })
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
    required: true,
  })
  @Get('/beneficiarios')
  @ApiOperation({
    summary: 'Devuelve un listado de contratos en un rango de una fecha o rango de fechas',
  })
  getRangoDeFecha(@Query() query): Promise<EstadisticasBeneficiarios[]> {
    const { fechaInicio, fechaFin } = query;

    if (this.fechaValida(fechaFin) && this.fechaValida(fechaInicio)) {
      return this.estadisticasService.obtenerTopBeneficiariosPorFecha(fechaInicio, fechaFin);
    }

    throw new HttpException('El formato de fecha debe ser YYYY-MM-DD.', HttpStatus.BAD_REQUEST);
  }

  private fechaValida(fecha: string): boolean {
    const formato = /^\d{4}-\d{2}-\d{2}$/;
    return formato.test(fecha);
  }
}
