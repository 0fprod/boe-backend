import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { concatMap, map, Observable } from 'rxjs';
import { Anuncio, Sumario } from './api-models';
import { anuncioMapper } from './mappers/anuncio.mapper';
import { mapSumarioABoe } from './mappers/sumario.mapper';
import { Boe, Contrato } from './models';
import { Xml2jsonService } from './xml2json.service';

@Injectable()
export class BoeApiService {
  private readonly SUMARIO_QUERY = '?id=BOE-S-';
  private readonly CONTRATO_QUERY = '?id=';

  constructor(private httpService: HttpService, private configService: ConfigService, private xml2JsonService: Xml2jsonService) {
    // TODO
  }

  public obtenerSumario(idSumario: string): Observable<Sumario> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.SUMARIO_QUERY}${idSumario}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Sumario>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
    );
  }

  public obtenerBoe(idSumario: string): Observable<Boe> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.SUMARIO_QUERY}${idSumario}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Sumario>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
      map<Sumario, Boe>((sumario: Sumario) => mapSumarioABoe(sumario)),
    );
  }

  public obtenerAnuncio(idSumario: string): Observable<Anuncio> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.CONTRATO_QUERY}${idSumario}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Anuncio>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
    );
  }

  public obtenerContrato(idSumario: string): Observable<Contrato> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.CONTRATO_QUERY}${idSumario}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Anuncio>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
      map<Anuncio, Contrato>((anuncio: Anuncio) => anuncioMapper(anuncio)),
    );
  }
}
