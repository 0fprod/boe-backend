import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

describe('ContratosController', () => {
  let controller: ContratosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
      providers: [ContratosService],
    }).compile();

    controller = module.get<ContratosController>(ContratosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
