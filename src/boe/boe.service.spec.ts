import { Test, TestingModule } from '@nestjs/testing';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { BoeService } from './boe.service';

describe('BoeService', () => {
  let service: BoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoeService, BoeApiService, ContratoRepository],
    }).compile();

    service = module.get<BoeService>(BoeService);
  });

  it('Se monta el servicio', () => {
    expect(service).toBeDefined();
  });

  it('Se ejecuta el flow', () => {
    // Mockear la respuesta de la api para que nos de el BOE con id de contratos
    // Mockear la respuesta de la api para que nos de contratos

    expect(service).toBeDefined();
  });
});
