import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, ConfigModule],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('Se monta el controlador', () => {
    expect(appController).toBeTruthy();
  });
});
