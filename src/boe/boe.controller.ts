import { Controller, Get, Param, Post } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { Boe, Contrato } from '../compartido/models';
import { BoeService } from './boe.service';

@Controller('boe')
export class BoeController {
  constructor(private boeService: BoeService) {}

  @Get('/sumario/:id')
  public async sumario(@Param() params): Promise<Sumario> {
    const { id } = params;
    return firstValueFrom(this.boeService.obtenerSumario(id));
  }

  @Get(':id')
  public async boe(@Param() params): Promise<Boe> {
    const { id } = params;
    return firstValueFrom(this.boeService.obtenerBoe(id));
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

  @Post('/cron')
  public anunciosId(boeId: string): string {
    // Es atacado por un CRONJOB para obtener los anuncios del día a través del boe
    return this.boeService.getHello();
  }
}
