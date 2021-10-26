import { Controller, Get, HttpCode, Param, Query, Res } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { Boe, Contrato } from '../compartido/models';
import { BoeService } from './boe.service';

@Controller('boe')
export class BoeController {
  constructor(private boeService: BoeService) {}

  @Get('/cron')
  @HttpCode(201)
  public async cron(@Query() query): Promise<any> {
    const { id } = query;
    // Es atacado por un CRONJOB para obtener los anuncios del día a través del boe
    const contrato = await firstValueFrom(this.boeService.obtenerContrato(id));
    const itemGuardado = await this.boeService.guardarContrato(contrato);
    return itemGuardado;
  }

  @Get('/boe/:id')
  public async boe(@Param() params, @Res() res): Promise<Boe> {
    try {
      const { id } = params;
      return firstValueFrom(this.boeService.obtenerBoe(id));
    } catch (err) {
      return res.send(400);
    }
  }

  @Get('/sumario/:id')
  public async sumario(@Param() params): Promise<Sumario> {
    const { id } = params;
    return firstValueFrom(this.boeService.obtenerSumario(id));
  }

  @Get('/anuncio/:id')
  public anuncioNativo(@Param() params): Promise<Anuncio> {
    const { id } = params;
    return firstValueFrom(this.boeService.obtenerAnuncio(id));
  }

  @Get('/contrato/:id')
  public anuncioParceado(@Param() params): Promise<Contrato> {
    const { id } = params;
    return firstValueFrom(this.boeService.obtenerContrato(id));
  }
}
