import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { concatMap, map, Observable } from 'rxjs';
import { Anuncio, Sumario } from './api-models';
import { mapAnuncioAContrato } from './mappers/anuncio.mapper';
import { mapSumarioABoe } from './mappers/sumario.mapper';
import { Boe, Contrato } from './models';
import { Xml2jsonService } from './xml2json.service';

@Injectable()
export class BoeApiService {
  private readonly SUMARIO_QUERY = '?id=BOE-S-';
  private readonly CONTRATO_QUERY = '?id=';

  constructor(private httpService: HttpService, private configService: ConfigService, private xml2JsonService: Xml2jsonService) {}

  public obtenerSumario(idSumario: string): Observable<Sumario> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.SUMARIO_QUERY}${idSumario}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Sumario>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
    );
  }

  public obtenerBoe(boeId: string): Observable<Boe> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.SUMARIO_QUERY}${boeId}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Sumario>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
      map<Sumario, Boe>((sumario: Sumario) => mapSumarioABoe(sumario)),
    );
  }

  public obtenerAnuncio(anuncioID: string): Observable<Anuncio> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.CONTRATO_QUERY}${anuncioID}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Anuncio>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
    );
  }

  public obtenerContrato(contratoId: string): Observable<Contrato> {
    return this.httpService.get<string>(`${this.configService.get('BOE_API_URL')}${this.CONTRATO_QUERY}${contratoId}`).pipe(
      concatMap<AxiosResponse<string, any>, Promise<Anuncio>>((value: AxiosResponse<string, any>) => {
        const { data: xml } = value;
        return this.xml2JsonService.parse(xml);
      }),
      map<Anuncio, Contrato>((anuncio: Anuncio) => mapAnuncioAContrato(anuncio)),
    );
  }
}
