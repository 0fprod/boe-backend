import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { mockBoeApiService } from '../../test/mocks/services/boeapi.service.mock';
import { MockRepository } from '../../test/mocks/services/repository.mock';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

describe('BoeController', () => {
  let controller: BoeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoeController, ConfigModule],
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
        ConfigService,
      ],
    }).compile();

    controller = module.get<BoeController>(BoeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
