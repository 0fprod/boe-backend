import { Test, TestingModule } from '@nestjs/testing';
import { Xml2jsonService } from './xml2json.service';
import { readFileSync } from 'fs';

describe('Xml2jsonService', () => {
  let service: Xml2jsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Xml2jsonService],
    }).compile();

    service = module.get<Xml2jsonService>(Xml2jsonService);
  });

  xit('Debería lanzar un error si el fichero es inválido', async () => {
    const invalidXmlFile = readFileSync(
      './test/mocks/xml/fichero-invalido.xml',
      { encoding: 'utf-8' },
    );

    const fn = async () => await service.parse(invalidXmlFile);

    await expect(fn()).rejects.toThrow('Fichero inválido');
  });

  it('Debería transformar un XML a un JSON', async () => {
    const invalidXmlFile = readFileSync('./test/mocks/xml/boe.xml', {
      encoding: 'utf-8',
    });

    const content = await service.parse(invalidXmlFile);

    expect(content).toBeTruthy();
  });
});
