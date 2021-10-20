import { Module } from '@nestjs/common';
import { Xml2jsonService } from '../compartido/xml2json.service';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  providers: [BoeService, Xml2jsonService],
})
export class BoeModule {}
