import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { ContratoDTO } from '../compartido/dto/contrato.dto';
import { Boe, Contrato } from '../compartido/models';

@Injectable()
export class BoeService {
  constructor(private boeApi: BoeApiService, private repositorio: ContratoRepository) {}

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

  public guardarContrato(contrato: Contrato): Promise<ContratoDTO> {
    return this.repositorio.guardarContrato(contrato);
  }
}
