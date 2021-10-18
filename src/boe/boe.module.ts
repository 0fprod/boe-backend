import { Module } from '@nestjs/common';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  providers: [BoeService],
})
export class BoeModule {}
