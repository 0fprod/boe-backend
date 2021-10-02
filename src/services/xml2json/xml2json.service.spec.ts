import { Test, TestingModule } from '@nestjs/testing';
import { readFileSync } from 'fs';
import { Anuncio, Sumario } from '../models';
import { Xml2jsonService } from './xml2json.service';

describe('Xml2jsonService', () => {
  let service: Xml2jsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Xml2jsonService],
    }).compile();

    service = module.get<Xml2jsonService>(Xml2jsonService);
  });

  it('Debería lanzar un error si el fichero es inválido', async () => {
    const xmlInvalido = readFileSync('./test/mocks/xml/fichero-invalido.xml', {
      encoding: 'utf-8',
    });

    const fn = async () => await service.parse(xmlInvalido);

    await expect(fn()).rejects.toThrow('Fichero inválido');
  });

  it('Debería transformar un XML del BOE a un JSON', async () => {
    const sumario = readFileSync('./test/mocks/xml/boe.xml', {
      encoding: 'utf-8',
    });

    const contenido: Sumario = await service.parse(sumario);

    expect(contenido).toBeTruthy();
  });

  it('Debería transformar un XML de un anuncio del BOE a un JSON', async () => {
    const anuncioLicitaction = readFileSync(
      './test/mocks/xml/anuncio-licitacion-1.xml',
      {
        encoding: 'utf-8',
      },
    );

    const contenido: Anuncio = await service.parse(anuncioLicitaction);

    expect(contenido).toBeTruthy();
  });
});
