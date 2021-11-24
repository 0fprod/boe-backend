import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/mongo.memory.server';
import { construirBeneficiario, construirContrato, construirDetallesDeContrato } from '../compartido/models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from '../compartido/schema/contrato.schema';
import { EstadisticasRepository } from './estadisticas.repository';

describe('Pruebas del repositorio de estadisticas', () => {
  let repositorio: EstadisticasRepository;
  let model: Model<ContratoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
      providers: [EstadisticasRepository],
    }).compile();

    repositorio = module.get<EstadisticasRepository>(EstadisticasRepository);
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
    await model.create([contratoIrrelevante1, contratoIrrelevante2, contratoFueraDeRango]);
    const beneficiarios = await repositorio.obtenerTopBeneficiariosPorFecha(fechaPubInicio, fechaPubFin);

    expect(beneficiarios).toHaveLength(2);
    expect(beneficiarios).toStrictEqual([
      { _id: 'empresa-1', numVeces: 3 },
      { _id: 'empresa-2', numVeces: 2 },
    ]);
  });
});
