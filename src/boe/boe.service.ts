import { Injectable } from '@nestjs/common';
import { firstValueFrom, forkJoin, map, Observable } from 'rxjs';
import { Anuncio, Sumario } from '../compartido/api-models';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Boe, Contrato } from '../compartido/models';
import { dividirEn, getColeccionDeFechas } from '../utils';

@Injectable()
export class BoeService {
  private readonly MAXIMO_CONTRATOS_POR_GRUPO = 50;
  constructor(private boeApi: BoeApiService, private repositorio: ContratoRepository) {}

  public getBoe(id: string): Observable<Boe> {
    return this.boeApi.getBoe(id);
  }

  public getSumario(id: string): Observable<Sumario> {
    return this.boeApi.getSumario(id);
  }

  public getAnuncio(id: string): Observable<Anuncio> {
    return this.boeApi.getAnuncio(id);
  }

  public getContrato(id: string): Observable<Contrato> {
    return this.boeApi.getContrato(id);
  }

  public guardarContrato(contrato: Contrato): Promise<Contrato> {
    return this.repositorio.guardarContrato(contrato);
  }

  // Nota: Por lo visto si intentamos resolver más de 50 contratos en una coleccion la libreria de xml2json falla.
  public async guardarContratosPorBoeId(id: string): Promise<number> {
    try {
      const { idContratos } = await firstValueFrom(this.boeApi.getBoe(id));
      console.log(`Boe con ${idContratos.length} id's de contratos`);

      const gruposDeContratos = dividirEn(this.MAXIMO_CONTRATOS_POR_GRUPO, idContratos);
      const contratos = [];

      for (let index = 0; index < gruposDeContratos.length; index++) {
        console.log(`Grupo ${index} con ${gruposDeContratos[index].length} contratos`);
        const parte = gruposDeContratos[index];
        const promisesDeContratos = parte.map((idC) => firstValueFrom(this.boeApi.getContrato(idC)));
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

  public async bulk(fecha: string): Promise<number> {
    // generar todas las fechas desde el primer día del mes hasta el último
    const fechas = getColeccionDeFechas(fecha);
    // Obtener todos los BOE de esas fechas
    const coleccionDeObservablesDeBoe: Observable<Boe>[] = fechas.map((fecha) => this.boeApi.getBoe(fecha));

    return firstValueFrom(
      forkJoin(coleccionDeObservablesDeBoe).pipe(
        map<Boe[], Promise<number>>((colecciondeBoe) => {
          return this.guardarContratosBulk(colecciondeBoe);
        }),
      ),
    );
  }

  private async guardarContratosBulk(boe: Boe[]): Promise<number> {
    let idActual = '';
    try {
      // Extraemos todos los ID de contratos de cada uno de los BOEs
      const idContratos = boe.map(({ idContratos }) => idContratos).flat();
      console.log(`Boe con ${idContratos.length} id's de contratos`);

      const gruposDeContratos = dividirEn(this.MAXIMO_CONTRATOS_POR_GRUPO, idContratos);
      const contratos = [];

      for (let index = 0; index < gruposDeContratos.length; index++) {
        console.log(`Grupo ${index} con ${gruposDeContratos[index].length} contratos`);
        const parte = gruposDeContratos[index];
        const promisesDeContratos = parte.map((idC) => {
          idActual = idC;
          return firstValueFrom(this.boeApi.getContrato(idC));
        });
        contratos.push(...(await Promise.all(promisesDeContratos)));
      }

      const totalDeContratosGuardados = this.repositorio.guardarContratos(contratos);
      return totalDeContratosGuardados;
    } catch (err) {
      console.log('Guardados 0 contratos');
      console.log(`Error con el id [${idActual}]:`, err);
      return 0;
    }
  }
}
