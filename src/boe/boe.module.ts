import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CompartidoModule } from '../compartido/compartido.module';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  imports: [CompartidoModule, ConfigModule],
  providers: [BoeService],
})
export class BoeModule {}
