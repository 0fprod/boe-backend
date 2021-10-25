import { Test, TestingModule } from '@nestjs/testing';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';
import { mockBoeApiService } from './mocks/boeapi.service.mock';
import { MockRepository } from './mocks/repository.mock';

describe('BoeController', () => {
  let controller: BoeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoeController],
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

    controller = module.get<BoeController>(BoeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
