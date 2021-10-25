import { Module } from '@nestjs/common';
import { CompartidoModule } from '../compartido/compartido.module';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  imports: [CompartidoModule],
  providers: [BoeService],
})
export class BoeModule {}
