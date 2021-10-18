import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Xml2jsonService } from './services/xml2json/xml2json.service';
import { ContratosModule } from './contratos/contratos.module';
import { BoeModule } from './boe/boe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env'],
      isGlobal: true,
    }),
    ContratosModule,
    BoeModule,
  ],
  controllers: [AppController],
  providers: [AppService, Xml2jsonService],
})
export class AppModule {}
