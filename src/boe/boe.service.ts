import { Anuncio, Sumario } from '@compartido/api-models';
import { BoeApiService } from '@compartido/boe-api.service';
import { Boe, Contrato } from '@compartido/models';
import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class BoeService {
  constructor(private boeApi: BoeApiService) {}

  public getHello(): string {
    return 'Hello';
  }

  public obtenerBoe(id: string): Observable<Boe> {
    return this.boeApi.obtenerBoe(id);
  }

  public obtenerSumario(id: string): Observable<Sumario> {
    return this.boeApi.obtenerSumario(id);
  }

  public obtenerAnuncio(id: string): Observable<Anuncio> {
    return this.boeApi.obtenerAnuncio(id);
  }

  public obtenerContrato(id: string): Observable<Contrato> {
    return this.boeApi.obtenerContrato(id);
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
