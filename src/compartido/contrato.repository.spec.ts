import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/mongo.memory.server';
import { ContratoRepository } from './contrato.repository';
import { construirBeneficiario, construirContrato, construirDetallesDeContrato } from './models';
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
    model.deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('Se monta el repositorio', () => {
    expect(repositorio).toBeTruthy();
  });

  it('Se guarda un contrato', async () => {
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante', contratoId: 'contrato1' });

    const contratoGuardado = await repositorio.guardarContrato(contratoIrrelevante);
    const contrato = await model.findOne({ contratoId: contratoGuardado.contratoId });

    expect(contrato).toBeTruthy();
    expect(contrato.contratoId).toEqual('contrato1');
    expect(contrato.titulo).toEqual('contrato irrelevante');
  });

  it('Se guardan varios contratos', async () => {
    const contratoIrrelevante = construirContrato({ titulo: 'contrato irrelevante', contratoId: 'contrato1' });

    const contratosGuardado = await repositorio.guardarContratos([
      contratoIrrelevante,
      contratoIrrelevante,
      contratoIrrelevante,
      contratoIrrelevante,
    ]);

    expect(contratosGuardado).toEqual(4);
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

  it('Devuelve beneficiarios y número de contratos se llevaron en determinada fecha', async () => {
    const fechaPubInicio = new Date(2020, 1, 1).toISOString();
    const fechaPubFin = new Date(2020, 11, 31).toISOString();
    const contratoIrrelevante1 = construirContrato({
      titulo: 'contrato irrelevante',
      detalles: construirDetallesDeContrato({
        beneficiarios: [
          construirBeneficiario({ nombre: 'empresa-1' }),
          construirBeneficiario({ nombre: 'empresa-1' }),
          construirBeneficiario({ nombre: 'empresa-2' }),
        ],
      }),
      fechaPub: new Date(2020, 4, 4).toISOString(),
    });
    const contratoIrrelevante2 = construirContrato({
      titulo: 'contrato irrelevante',
      detalles: construirDetallesDeContrato({
        beneficiarios: [
          construirBeneficiario({ nombre: 'empresa-1' }),
          construirBeneficiario({ nombre: 'empresa-4' }),
          construirBeneficiario({ nombre: 'empresa-3' }),
          construirBeneficiario({ nombre: 'empresa-2' }),
        ],
      }),
      fechaPub: new Date(2020, 6, 8).toISOString(),
    });
    const contratoFueraDeRango = construirContrato({
      titulo: 'contrato irrelevante',
      detalles: construirDetallesDeContrato({
        beneficiarios: [construirBeneficiario({ nombre: 'empresa-4' }), construirBeneficiario({ nombre: 'empresa-5' })],
      }),
      fechaPub: new Date(2022, 6, 8).toISOString(),
    });

    // Act
    await repositorio.guardarContratos([contratoIrrelevante1, contratoIrrelevante2, contratoFueraDeRango]);
    const beneficiarios = await repositorio.obtenerTopBeneficiariosPorFecha(fechaPubInicio, fechaPubFin);

    expect(beneficiarios).toHaveLength(2);
    expect(beneficiarios).toStrictEqual([
      { _id: 'empresa-1', numVeces: 3 },
      { _id: 'empresa-2', numVeces: 2 },
    ]);
  });
});
