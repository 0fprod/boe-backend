import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { swaggerUi } from './swagger-styles';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Contratos públicos formalizados')
    .setDescription('Esta API sirve datos de contratos formalizados anunciados en la api del BOE en la sección de 5A de anuncios.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, {
    customSiteTitle: 'Formalización de contratos del BOE',
    customCss: `.download-url-wrapper {display:none !important;} ${swaggerUi}`,
  });

  await app.listen(3000);
}
bootstrap();
