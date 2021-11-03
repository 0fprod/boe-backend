import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
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
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
