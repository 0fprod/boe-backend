import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { closeInMongodConnection, rootMongooseTestModule } from '../../test/mongo.memory.server';
import { construirBeneficiario, construirContrato, construirDetallesDeContrato, constuirInstitucion } from '../compartido/models';
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
        construirBeneficiario({ nombre: 'empresa-1', esPyme: true, coste: 10 }),
        construirBeneficiario({ nombre: 'empresa-1', esPyme: false, coste: 10 }),
        construirBeneficiario({ nombre: 'empresa-2', esPyme: false, coste: 10 }),
      ],
      institucion: constuirInstitucion({ actividad: 'Actividad 1' }),
    }),
    fechaPub: new Date(2020, 4, 4).toISOString(),
  });
  const contrato2 = construirContrato({
    titulo: 'contrato irrelevante',
    detalles: construirDetallesDeContrato({
      beneficiarios: [
        construirBeneficiario({ nombre: 'empresa-1', esPyme: true, coste: 10 }),
        construirBeneficiario({ nombre: 'empresa-4', esPyme: false, coste: 10 }),
        construirBeneficiario({ nombre: 'empresa-3', esPyme: false, coste: 10 }),
        construirBeneficiario({ nombre: 'empresa-2', esPyme: true, coste: 10 }),
      ],
      institucion: constuirInstitucion({ actividad: 'Actividad 2' }),
    }),
    fechaPub: new Date(2020, 6, 8).toISOString(),
  });
  const contrato3 = construirContrato({
    titulo: 'contrato irrelevante',
    detalles: construirDetallesDeContrato({
      beneficiarios: [construirBeneficiario({ nombre: 'empresa-4', coste: 10 }), construirBeneficiario({ nombre: 'empresa-5', coste: 20 })],
      institucion: constuirInstitucion({ actividad: 'Actividad 1' }),
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
    const beneficiarios = await servicio.getTopBeneficiariosPorFecha(fechaPubInicio, fechaPubFin);

    expect(beneficiarios).toHaveLength(2);
    expect(beneficiarios).toStrictEqual([
      { etiqueta: 'empresa-1', valor: 3 },
      { etiqueta: 'empresa-2', valor: 2 },
    ]);
  });

  it('Devuelve gastos por pymes/no pymes en determinada fecha', async () => {
    const fechaPubInicio = new Date(2020, 1, 1).toISOString();
    const fechaPubFin = new Date(2020, 11, 31).toISOString();
    const estadisticasPyme = await servicio.getGastosPorPymes(fechaPubInicio, fechaPubFin);

    expect(estadisticasPyme).toHaveLength(2);
    expect(estadisticasPyme).toStrictEqual([
      { etiqueta: 'No PYME', valor: 40 },
      { etiqueta: 'PYME', valor: 30 },
    ]);
  });
  it('Devuelve beneficiarios y número de contratos se llevaron en determinada fecha', async () => {
    const fechaPubInicio = new Date(2020, 1, 1).toISOString();
    const fechaPubFin = new Date(2020, 11, 31).toISOString();
    const estadisticasPorActividad = await servicio.getGastosPorActividad(fechaPubInicio, fechaPubFin);

    expect(estadisticasPorActividad).toHaveLength(2);
    expect(estadisticasPorActividad).toStrictEqual([
      { etiqueta: 'Actividad 1', valor: 30 },
      { etiqueta: 'Actividad 2', valor: 40 },
    ]);
  });
});
