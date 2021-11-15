import { Injectable } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Boe, Contrato } from '../compartido/models';

@Injectable()
export class BoeService {
  constructor(private boeApi: BoeApiService, private repositorio: ContratoRepository) {}

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

  public guardarContrato(contrato: Contrato): Promise<Contrato> {
    return this.repositorio.guardarContrato(contrato);
  }

  public async guardarContratosPorBoeId(id: string): Promise<number> {
    try {
      const { idContratos } = await firstValueFrom(this.boeApi.obtenerBoe(id));
      const promisesDeContratos = idContratos.map((idC) => firstValueFrom(this.boeApi.obtenerContrato(idC)));
      const contratos = await Promise.all(promisesDeContratos);
      const totalDeContratosGuardados = this.repositorio.guardarContratos(contratos);
      return totalDeContratosGuardados;
    } catch (err) {
      console.log(`Error con el id [${id}]:`, err);
      return 0;
    }
  }
}
