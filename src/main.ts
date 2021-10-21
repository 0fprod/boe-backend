import { NestFactory } from '@nestjs/core';
import { addAliases } from 'module-alias';
import { resolve } from 'path';
import { AppModule } from './app.module';

addAliases({
  '@boe': resolve(__dirname, 'boe'),
  '@contratos': resolve(__dirname, 'contratos'),
  '@compartido': resolve(__dirname, 'compartido'),
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
