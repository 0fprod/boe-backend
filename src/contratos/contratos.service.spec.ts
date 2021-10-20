import { Test, TestingModule } from '@nestjs/testing';
import { ContratosService } from './contratos.service';

describe('ContratosService', () => {
  let service: ContratosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContratosService],
    }).compile();

    service = module.get<ContratosService>(ContratosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
