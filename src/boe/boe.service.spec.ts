import { Test, TestingModule } from '@nestjs/testing';
import { mockBoeApiService } from '../../test/mocks/services/boeapi.service.mock';
import { MockRepository } from '../../test/mocks/services/repository.mock';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { BoeService } from './boe.service';

describe('BoeService', () => {
  let service: BoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BoeService,
        BoeApiService,
        {
          provide: BoeApiService,
          useClass: mockBoeApiService,
        },
        ContratoRepository,
        {
          provide: ContratoRepository,
          useClass: MockRepository,
        },
      ],
    }).compile();

    service = module.get<BoeService>(BoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
