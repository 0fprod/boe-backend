import { Test, TestingModule } from '@nestjs/testing';
import { CompartidoModule } from '../compartido/compartido.module';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

describe('BoeController', () => {
  let controller: BoeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoeController],
      imports: [CompartidoModule],
      providers: [BoeService],
    }).compile();

    controller = module.get<BoeController>(BoeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
