import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Xml2jsonService } from './services/xml2json/xml2json.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Xml2jsonService],
})
export class AppModule {}
