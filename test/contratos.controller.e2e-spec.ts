import { INestApplication } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import * as request from 'supertest';
import { construirContrato } from '../src/compartido/models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from '../src/compartido/schema/contrato.schema';
import { ContratosModule } from '../src/contratos/contratos.module';
import { fechaPublicacionMapper } from '../src/utils';
import { rootMongooseTestModule } from './mongo.memory.server';

describe('API endpoints testing (e2e)', () => {
  let app: INestApplication;
  let model: Model<ContratoDoc>;
  const contrato1 = construirContrato({ contratoId: 'contratoId-1', fechaPub: fechaPublicacionMapper('20200501') });
  const contrato2 = construirContrato({ contratoId: 'contratoId-2', fechaPub: fechaPublicacionMapper('20200503') });
  const contrato3 = construirContrato({ contratoId: 'contratoId-3', fechaPub: fechaPublicacionMapper('20200505') });
  const contrato4 = construirContrato({ contratoId: 'contratoId-4', fechaPub: fechaPublicacionMapper('20200505') });

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ContratosModule,
        rootMongooseTestModule(),
        MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }]),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    model = moduleFixture.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));

    await model.insertMany([contrato1, contrato2, contrato3, contrato4]);
  });

  it('-GET [/contratos/contrato/:id] Devuelve 200 y el contrato con el id correcto', () => {
    return request(app.getHttpServer()).get('/contratos/contrato/contratoId-1').expect(200).expect(contrato1);
  });

  it('-GET [/contratos/contrato/:id] Devuelve 404 si el contrato ni existe', () => {
    return request(app.getHttpServer())
      .get('/contratos/contrato/id-invalido')
      .expect(404)
      .expect({ statusCode: 404, message: 'El contrato no existe' });
  });

  it('-GET [/contratos/rango] Devuelve 400 si no se especifican las fechas', () => {
    return request(app.getHttpServer())
      .get('/contratos/rango')
      .expect(400)
      .expect({ statusCode: 400, message: 'El formato de fecha debe ser YYYY-MM-DD.' });
  });

  it('-GET [/contratos/rango] Devuelve 400 si la fecha de inicio es invalida', () => {
    return request(app.getHttpServer())
      .get('/contratos/rango?fechaInicio=AAA')
      .expect(400)
      .expect({ statusCode: 400, message: 'El formato de fecha debe ser YYYY-MM-DD.' });
  });

  it('-GET [/contratos/rango] Devuelve 400 si la fecha final es invalida', () => {
    return request(app.getHttpServer())
      .get('/contratos/rango?fechaInicio=2020/05/05&fechaFinal=AAA')
      .expect(400)
      .expect({ statusCode: 400, message: 'El formato de fecha debe ser YYYY-MM-DD.' });
  });

  it('-GET [/contratos/rango] Devuelve 200 y la lista de contratos de una fecha', () => {
    return request(app.getHttpServer()).get('/contratos/rango?fechaInicio=2020-05-05').expect(200).expect([contrato3, contrato4]);
  });

  it('-GET [/contratos/rango] Devuelve 200 y la lista de contratos en rango de 2 fechas', () => {
    return request(app.getHttpServer())
      .get('/contratos/rango?fechaInicio=2020-05-01&fechaFin=2020-05-04')
      .expect(200)
      .expect([contrato1, contrato2]);
  });
});
