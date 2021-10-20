import { Test, TestingModule } from '@nestjs/testing';
import { BoeApiService } from './boe-api.service';

describe('BoeApiService', () => {
  let service: BoeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoeApiService],
    }).compile();

    service = module.get<BoeApiService>(BoeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
