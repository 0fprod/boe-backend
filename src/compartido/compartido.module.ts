import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BoeApiService } from './boe-api.service';
import { Xml2jsonService } from './xml2json.service';

@Module({
  imports: [HttpModule],
  providers: [BoeApiService, ConfigService, Xml2jsonService],
  exports: [HttpModule, BoeApiService, ConfigService, Xml2jsonService],
})
export class CompartidoModule {}
