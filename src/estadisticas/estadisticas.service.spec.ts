import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/mongo.memory.server';
import { construirBeneficiario, construirContrato, construirDetallesDeContrato } from '../compartido/models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from '../compartido/schema/contrato.schema';
import { EstadisticasRepository } from './estadisticas.repository';
import { EstadisticasService } from './estadisticas.service';

describe('EstadisticasService', () => {
  let servicio: EstadisticasService;
  let model: Model<ContratoDoc>;
  const contrato1 = construirContrato({
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
  const contrato2 = construirContrato({
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
  const contrato3 = construirContrato({
    titulo: 'contrato irrelevante',
    detalles: construirDetallesDeContrato({
      beneficiarios: [construirBeneficiario({ nombre: 'empresa-4' }), construirBeneficiario({ nombre: 'empresa-5' })],
    }),
    fechaPub: new Date(2022, 6, 8).toISOString(),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [rootMongooseTestModule(), MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
      providers: [EstadisticasService, EstadisticasRepository],
    }).compile();

    servicio = module.get<EstadisticasService>(EstadisticasService);
    model = module.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));
    await model.insertMany([contrato1, contrato2, contrato3]);
  });

  afterEach(() => {
    jest.clearAllMocks();
    model.deleteMany({});
  });

  afterAll(async () => {
    await closeInMongodConnection();
  });

  it('Se monta el servicio', () => {
    expect(servicio).toBeDefined();
  });

  it('Devuelve beneficiarios y número de contratos se llevaron en determinada fecha', async () => {
    const fechaPubInicio = new Date(2020, 1, 1).toISOString();
    const fechaPubFin = new Date(2020, 11, 31).toISOString();
    const beneficiarios = await servicio.obtenerTopBeneficiariosPorFecha(fechaPubInicio, fechaPubFin);

    expect(beneficiarios).toHaveLength(2);
    expect(beneficiarios).toStrictEqual([
      { etiqueta: 'empresa-1', valor: 3 },
      { etiqueta: 'empresa-2', valor: 2 },
    ]);
  });
});
