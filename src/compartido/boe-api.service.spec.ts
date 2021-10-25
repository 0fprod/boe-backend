import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AxiosResponse } from 'axios';
import { firstValueFrom, of } from 'rxjs';
import { AnuncioIrrelevante } from '../../test/mocks/strings/mock-anuncio';
import { SumarioIrrelevante } from '../../test/mocks/strings/mock-sumario';
import { BoeApiService } from './boe-api.service';
import { construirBeneficiario, construirBoe, construirContrato, construirDetallesDeContrato, constuirInstitucion } from './models';
import { Xml2jsonService } from './xml2json.service';

describe('BoeApiService', () => {
  let service: BoeApiService;
  let http: HttpService;
  const mockDeAnuncio: AxiosResponse<string, any> = {
    data: AnuncioIrrelevante,
    config: {},
    headers: {},
    status: 200,
    statusText: 'OK',
  };
  const mockDeSumario: AxiosResponse<string, any> = {
    data: SumarioIrrelevante,
    config: {},
    headers: {},
    status: 200,
    statusText: 'OK',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BoeApiService, ConfigService, Xml2jsonService],
    }).compile();

    service = module.get<BoeApiService>(BoeApiService);
    http = module.get<HttpService>(HttpService);
  });

  it('Se define el servicio', () => {
    expect(service).toBeDefined();
  });

  it('Se obtiene un contrato a partir de un ID de Anuncio', async () => {
    jest.spyOn(http, 'get').mockReturnValue(of(mockDeAnuncio));
    const contratoVacio = construirContrato({
      contratoId: 'identificador irrelevante',
      titulo: 'Titulo irrelevante.',
      detalles: construirDetallesDeContrato({
        institucion: constuirInstitucion({
          nombre: 'Institucion irrelevante.',
          nif: 'NIF irrelevante.',
        }),
        descripcion: 'Descripcion irrelevante.',
        beneficiarios: [
          construirBeneficiario({
            coste: 99999.99,
            descripcion: 'Lote irrelevante',
            nif: 'NIF irrelevante.',
            nombre: 'Beneficiario irrelevante',
            lote: 'Lote 1',
          }),
        ],
      }),
    });

    const contrato = await firstValueFrom(service.obtenerContrato('identificador irrelevante'));

    expect(contratoVacio).toStrictEqual(contrato);
  });

  it('Se obtiene un boe a partir de un ID de Sumario', async () => {
    jest.spyOn(http, 'get').mockReturnValue(of(mockDeSumario));
    const boeVacio = construirBoe(['identificador irrelevante-1', 'identificador irrelevante-2']);

    const boe = await firstValueFrom(service.obtenerBoe('identificador irrelevante'));

    expect(boeVacio).toStrictEqual(boe);
  });
});
