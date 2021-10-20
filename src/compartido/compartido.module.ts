import { Module } from '@nestjs/common';
import { BoeApiService } from './boe-api.service';

@Module({
  providers: [BoeApiService],
})
export class CompartidoModule {}
