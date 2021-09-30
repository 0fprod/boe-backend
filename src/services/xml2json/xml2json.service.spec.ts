import { Test, TestingModule } from '@nestjs/testing';
import { Xml2jsonService } from './xml2json.service';

describe('Xml2jsonService', () => {
  let service: Xml2jsonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Xml2jsonService],
    }).compile();

    service = module.get<Xml2jsonService>(Xml2jsonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
