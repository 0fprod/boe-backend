import { Injectable } from '@nestjs/common';
import { firstValueFrom, Observable } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Boe, Contrato } from '../compartido/models';
import { dividirEn } from '../utils';

@Injectable()
export class BoeService {
  private readonly MAXIMO_CONTRATOS_POR_GRUPO = 50;
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

  // Nota: Por lo visto si intentamos resolver más de 50 contratos en una coleccion la libreria de xml2json falla.
  public async guardarContratosPorBoeId(id: string): Promise<number> {
    try {
      const { idContratos } = await firstValueFrom(this.boeApi.obtenerBoe(id));
      console.log(`Boe con ${idContratos.length} id's de contratos`);

      const gruposDeContratos = dividirEn(this.MAXIMO_CONTRATOS_POR_GRUPO, idContratos);
      const contratos = [];

      for (let index = 0; index < gruposDeContratos.length; index++) {
        console.log(`Grupo ${index} con ${gruposDeContratos[index].length} contratos`);
        const parte = gruposDeContratos[index];
        const promisesDeContratos = parte.map((idC) => firstValueFrom(this.boeApi.obtenerContrato(idC)));
        contratos.push(...(await Promise.all(promisesDeContratos)));
      }

      const totalDeContratosGuardados = this.repositorio.guardarContratos(contratos);
      return totalDeContratosGuardados;
    } catch (err) {
      console.log('Guardados 0 contratos');
      console.log(`Error con el id [${id}]:`, err);
      return 0;
    }
  }
}
