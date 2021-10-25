import { Test, TestingModule } from '@nestjs/testing';
import { BoeApiService } from '../compartido/boe-api.service';
import { BoeService } from './boe.service';
import { mockBoeApiService } from './mocks/boeapi.service.mock';

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
      ],
    }).compile();

    service = module.get<BoeService>(BoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
