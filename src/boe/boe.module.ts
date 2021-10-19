import { Module } from '@nestjs/common';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';
import { Xml2jsonService } from './xml2json.service';

@Module({
  controllers: [BoeController],
  providers: [BoeService, Xml2jsonService],
})
export class BoeModule {}
