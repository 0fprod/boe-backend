import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { rootMongooseTestModule } from '../../test/mongo.memory.server';
import { ContratoRepository } from './contrato.repository';
import { construirContrato } from './models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from './schema/contrato.schema';

describe('Pruebas del repositorio de contrato', () => {
  let repositorio: ContratoRepository;
  let model: Model<ContratoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
      providers: [ContratoRepository],
    }).compile();

    repositorio = module.get<ContratoRepository>(ContratoRepository);
    model = module.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Se monta el repositorio', () => {
    expect(repositorio).toBeTruthy();
  });

  it('Se guarda un contrato', async () => {
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante' });

    const contratoGuardado = await repositorio.guardarContrato(contratoIrrelevante);
    const contrato = await model.findById(contratoGuardado.id);

    expect(contrato).toBeTruthy();
    expect(contrato.id).toBeTruthy();
    expect(contrato.titulo).toEqual('contrato irrelevante');
  });

  it('Devuelve un contrato a partir de un id de contrato', async () => {
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante', contratoId: 'contrato-id' });

    let contrato = await repositorio.obtenerContratoPorId('contrato-id');
    expect(contrato).toBeNull();

    await repositorio.guardarContrato(contratoIrrelevante);

    contrato = await repositorio.obtenerContratoPorId('contrato-id');
    expect(contrato).toBeTruthy();
    expect(contrato.titulo).toEqual('contrato irrelevante');
    expect(contrato.contratoId).toEqual('contrato-id');
  });

  it('Devuelve contratos a partir de una fecha de publicación', async () => {
    const fechaPub = new Date().toISOString();
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante', contratoId: 'contrato-id', fechaPub });

    let contratos = await repositorio.obtenerContratoPorFecha(fechaPub);
    expect(contratos).toHaveLength(0);

    await repositorio.guardarContrato(contratoIrrelevante);

    contratos = await repositorio.obtenerContratoPorFecha(fechaPub);
    expect(contratos).toHaveLength(1);
    expect(contratos[0].titulo).toEqual('contrato irrelevante');
    expect(contratos[0].contratoId).toEqual('contrato-id');
  });

  it('Devuelve contratos a partir de un rango de fechas de publicación', async () => {
    const fechaPubInicio = new Date().toISOString();
    const fechaPubFin = new Date().toISOString();
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante', contratoId: 'contrato-id', fechaPub: fechaPubInicio });

    let contratos = await repositorio.obtenerContratoPorRangoDeFecha(fechaPubInicio, fechaPubFin);
    expect(contratos).toHaveLength(0);

    await repositorio.guardarContrato(contratoIrrelevante);

    contratos = await repositorio.obtenerContratoPorRangoDeFecha(fechaPubInicio, fechaPubFin);
    expect(contratos).toHaveLength(1);
    expect(contratos[0].titulo).toEqual('contrato irrelevante');
    expect(contratos[0].contratoId).toEqual('contrato-id');
  });

  it('No devuelve contratos si no estan en un rango de fechas de publicación', async () => {
    const fechaPubInicio = new Date(2020, 1, 1).toISOString();
    const fechaPubFin = new Date(2020, 1, 3).toISOString();
    const contratoIrrelevante = construirContrato({
      titulo: 'contrato irrelevante',
      contratoId: 'contrato-id',
      fechaPub: new Date().toISOString(),
    });

    let contratos = await repositorio.obtenerContratoPorRangoDeFecha(fechaPubInicio, fechaPubFin);
    expect(contratos).toHaveLength(0);

    await repositorio.guardarContrato(contratoIrrelevante);

    contratos = await repositorio.obtenerContratoPorRangoDeFecha(fechaPubInicio, fechaPubFin);
    expect(contratos).toHaveLength(0);
  });
});
