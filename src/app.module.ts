import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { BoeModule } from './boe/boe.module';
import { ContratosModule } from './contratos/contratos.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env.dev', '.env.production'],
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    ContratosModule,
    BoeModule,
    EstadisticasModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
