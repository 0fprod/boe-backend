import { Controller, Get } from '@nestjs/common';
import { BoeService } from './boe.service';

@Controller('boe')
export class BoeController {
  constructor(private boeService: BoeService) {}

  @Get()
  public anunciosId(boeId: string): string {
    // Es atacado por un CRONJOB para obtener los anuncios del día a través del boe
    return this.boeService.getHello();
  }

  @Get()
  public anuncioNativo(idAnuncio: string): string {
    // Llamamos a la API del boe y devolvemos JSON sin parsear
    return this.boeService.getHello();
  }

  @Get()
  public anuncioParceado(idAnuncio: string): string {
    // Llamamos a la API del boe y devolvemos JSON parseado
    return this.boeService.getHello();
  }
}
