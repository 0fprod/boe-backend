import { CompartidoModule } from '@compartido/compartido.module';
import { Module } from '@nestjs/common';
import { BoeController } from './boe.controller';
import { BoeService } from './boe.service';

@Module({
  controllers: [BoeController],
  imports: [CompartidoModule],
  providers: [BoeService],
})
export class BoeModule {}
