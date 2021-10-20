import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { BoeApiService } from './boe-api.service';
import { Xml2jsonService } from './xml2json.service';

describe('BoeApiService', () => {
  let service: BoeApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [BoeApiService, ConfigService, Xml2jsonService],
    }).compile();

    service = module.get<BoeApiService>(BoeApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
