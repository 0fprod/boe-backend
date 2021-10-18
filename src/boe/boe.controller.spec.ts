import { Test, TestingModule } from '@nestjs/testing';
import { BoeController } from './boe.controller';

describe('BoeController', () => {
  let controller: BoeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoeController],
    }).compile();

    controller = module.get<BoeController>(BoeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
