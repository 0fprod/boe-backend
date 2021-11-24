import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EstadisticasBeneficiario } from '../swagger/dto/estadisticas.dto';
import { EstadisticasService } from './estadisticas.service';
import { Estadistica } from './models/estadisticas.model';

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
    summary: 'Devuelve una lista de empresas con el numero de contratos obtenidos en un rango de fechas',
  })
  getBeneficiarios(@Query() query): Promise<Estadistica[]> {
    const { fechaInicio, fechaFin } = query;

    if (this.fechaValida(fechaFin) && this.fechaValida(fechaInicio)) {
      return this.estadisticasService.obtenerTopBeneficiariosPorFecha(fechaInicio, fechaFin);
    }

    throw new HttpException('El formato de fecha debe ser YYYY-MM-DD.', HttpStatus.BAD_REQUEST);
  }

  @ApiResponse({
    status: 200,
    description: 'EstadisticasPYMES',
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
  @Get('/pyme')
  @ApiOperation({
    summary: 'Devuelve el total gastado en pymes/no pymes en un rango de fechas',
  })
  getPymes(@Query() query): Promise<Estadistica[]> {
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
