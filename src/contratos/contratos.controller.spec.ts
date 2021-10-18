import { Test, TestingModule } from '@nestjs/testing';
import { ContratosController } from './contratos.controller';

describe('ContratosController', () => {
  let controller: ContratosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
    }).compile();

    controller = module.get<ContratosController>(ContratosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
