import { BadRequestException, Controller, Get, HttpCode, Param, Query } from '@nestjs/common';
import { ApiExcludeEndpoint, ApiHeader, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { Boe, Contrato } from '../compartido/models';
import { BoeDTO } from '../swagger/dto/boe.dto';
import { BoeService } from './boe.service';

@ApiTags('BOE')
@Controller('boe')
export class BoeController {
  constructor(private boeService: BoeService) {}

  @ApiResponse({
    status: 201,
    description: 'Devuelve el número de contratos guardados',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiOperation({
    summary: 'Añade a la BBDD los contratos de la fecha indicada',
  })
  @ApiQuery({
    name: 'id',
    description: 'Fecha de publicacion de contratos',
    example: '20200506',
    required: true,
  })
  @ApiHeader({
    name: 'Authentication bearer',
    required: true,
  })
  @ApiExcludeEndpoint()
  @Get('/cron')
  @HttpCode(201)
  public async cron(@Query() query): Promise<any> {
    const { id } = query;
    const guardados = await this.boeService.guardarContratosPorBoeId(id);
    return guardados;
  }

  @ApiResponse({
    status: 201,
    description: 'Devuelve el número de contratos guardados',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'No autorizado',
  })
  @ApiOperation({
    summary: 'Añade a la BBDD los contratos de la fecha indicada',
  })
  @ApiQuery({
    name: 'fecha',
    description: 'Mes y año de donde queremos extraer los contratos',
    example: '202005',
    required: true,
  })
  @ApiHeader({
    name: 'Authentication bearer',
    required: true,
  })
  @ApiExcludeEndpoint()
  @Get('/bulk')
  @HttpCode(201)
  public async bulk(@Query() query): Promise<any> {
    const { fecha } = query;

    // if (fecha) {
    //   const numDeContratosGuardados = await this.boeService.bulk(fecha);
    //   return numDeContratosGuardados;
    // }

    throw new BadRequestException();
  }

  @ApiResponse({
    status: 200,
    description: 'Lista de contratos en el BOE de la fecha indicada',
    type: BoeDTO,
  })
  @ApiParam({
    name: 'id',
    description: 'Año, mes y día del BOE en cuestión',
    format: 'AAAAMMDD',
  })
  @ApiOperation({
    summary: 'Devuelve un conjunto de id de contratos en base al BOE de cierta fecha',
  })
  @ApiResponse({ status: 400, description: 'Parámetro inválido.' })
  @Get('/boe/:id')
  public async boe(@Param() params): Promise<Boe> {
    const { id } = params;
    if (id) {
      return firstValueFrom(this.boeService.getBoe(id));
    }

    throw new BadRequestException();
  }

  @ApiOperation({
    summary: 'Devuelve el sumario del boe dada una fecha sin parsear',
  })
  @ApiParam({
    name: 'id',
    description: 'Año, mes y día del sumario',
    format: 'AAAAMMDD',
  })
  @ApiResponse({ status: 400, description: 'Parámetro inválido.' })
  @Get('/sumario/:id')
  public async sumario(@Param() params): Promise<Sumario> {
    const { id } = params;
    if (id) {
      return firstValueFrom(this.boeService.getSumario(id));
    }
    throw new BadRequestException();
  }

  @ApiParam({
    name: 'id',
    description: 'Año y id de un anuncio',
    format: 'BOE-S-AAAA-XXXX',
  })
  @ApiResponse({ status: 400, description: 'Parámetro inválido.' })
  @ApiOperation({
    summary: 'Devuelve el anuncio sin parsear en base a un ID',
  })
  @Get('/anuncio/:id')
  public anuncioNativo(@Param() params): Promise<Anuncio> {
    const { id } = params;
    if (id) {
      return firstValueFrom(this.boeService.getAnuncio(id));
    }
    throw new BadRequestException();
  }

  @ApiParam({
    name: 'id',
    description: 'Año y id de un contrato',
    format: 'BOE-S-AAAA-XXXX',
  })
  @ApiOperation({
    summary: 'Devuelve el contrato en base a un ID',
  })
  @ApiResponse({ status: 400, description: 'Parámetro inválido.' })
  @Get('/contrato/:id')
  public anuncioParceado(@Param() params): Promise<Contrato> {
    const { id } = params;
    if (id) {
      return firstValueFrom(this.boeService.getContrato(id));
    }
    throw new BadRequestException();
  }
}
