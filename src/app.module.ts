import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoeModule } from './boe/boe.module';
import { ContratosModule } from './contratos/contratos.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ContratosModule,
    BoeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
