import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private configService: ConfigService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/env')
  getEnv(): string {
    return this.configService.get('DATABASE_USER');
  }
}
