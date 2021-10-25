import { Module } from '@nestjs/common';
import { BoeApiService } from '../compartido/boe-api.service';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  providers: [BoeService, BoeApiService],
})
export class BoeModule {}
