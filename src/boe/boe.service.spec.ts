import { CompartidoModule } from '@compartido/compartido.module';
import { Test, TestingModule } from '@nestjs/testing';
import { BoeService } from './boe.service';

describe('BoeService', () => {
  let service: BoeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoeService],
      imports: [CompartidoModule],
    }).compile();

    service = module.get<BoeService>(BoeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
