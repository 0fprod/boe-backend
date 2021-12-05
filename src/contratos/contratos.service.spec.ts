import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/mongo.memory.server';
import { ContratoRepository } from '../compartido/contrato.repository';
import { construirContrato, Contrato } from '../compartido/models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from '../compartido/schema/contrato.schema';
import { fechaPublicacionMapper } from '../utils';
import { ContratosService } from './contratos.service';

const buscarPorId = (coleccion: Contrato[], idContrato: string): number => coleccion.findIndex((c) => c.contratoId === idContrato);

describe('ContratosService', () => {
  let servicio: ContratosService;
  let model: Model<ContratoDoc>;
  const contrato1 = construirContrato({ contratoId: 'contratoId-1', fechaPub: fechaPublicacionMapper('20200501') });
  const contrato2 = construirContrato({ contratoId: 'contratoId-2', fechaPub: fechaPublicacionMapper('20200503') });
  const contrato3 = construirContrato({ contratoId: 'contratoId-3', fechaPub: fechaPublicacionMapper('20200505') });
  const contrato4 = construirContrato({ contratoId: 'contratoId-4', fechaPub: fechaPublicacionMapper('20200505') });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
      providers: [ContratosService, ContratoRepository],
    }).compile();

    servicio = module.get<ContratosService>(ContratosService);
    model = module.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));

    await model.insertMany([contrato1, contrato2, contrato3, contrato4]);
  });

  afterEach(async () => {
    await model.deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('Se monta el servicio', () => {
    expect(servicio).toBeDefined();
  });

  it('Devuelve un contrato dado un id de contrato', async () => {
    const contrato = await servicio.getContratoPorId('contratoId-1');
    expect(contrato).toBeTruthy();
    expect(contrato.contratoId).toEqual('contratoId-1');
  });

  it('Devuelve los contratos de un día dada una fecha', async () => {
    const fechaPub = fechaPublicacionMapper('20200505');
    const contratos = await servicio.getContratoPorFecha(fechaPub);
    expect(contratos).toBeTruthy();
    expect(contratos).toHaveLength(2);
    expect(buscarPorId(contratos, 'contratoId-3')).toBeGreaterThan(-1);
    expect(buscarPorId(contratos, 'contratoId-4')).toBeGreaterThan(-1);
  });

  it('Devuelve los contratos que esten en un rango de fecha dado', async () => {
    const inicio = fechaPublicacionMapper('20200501');
    const fin = fechaPublicacionMapper('20200503');
    const contratos = await servicio.getContratoPorRangoFecha(inicio, fin);
    expect(contratos).toBeTruthy();
    expect(contratos).toHaveLength(2);
    expect(buscarPorId(contratos, 'contratoId-1')).toBeGreaterThan(-1);
    expect(buscarPorId(contratos, 'contratoId-2')).toBeGreaterThan(-1);
  });
});
