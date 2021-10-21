import { BoeModule } from '@boe/boe.module';
import { ContratosModule } from '@contratos/contratos.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

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
  providers: [AppService],
})
export class AppModule {}
