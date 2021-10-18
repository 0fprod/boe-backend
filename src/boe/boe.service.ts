import { Injectable } from '@nestjs/common';

@Injectable()
export class BoeService {
  public getHello(): string {
    return 'Hello';
  }

  private llamarBoeApi(): void {
    // Recibimos un ID del boe de HOY
    // Llamamos a la API
    // Sacamos un obeto BOE con todos los ID de los anuncios
    // Llamamos a la API por cada ID de anuncio
    // Parseamos cada respuesta de XML -> JSON -> Modelo
    // Guardamos el resultado en la BD
  }

  private parsearAnuncio(): void {
    // TODO
  }

  private parsearBoe(): void {
    // TODO
  }
}
