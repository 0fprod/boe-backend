import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { ContratoRepository } from './contrato.repository';
import { ContratoDTO } from './dto/contrato.dto';
import { construirContrato } from './models';
import { ContratoDoc, ContratoEntity } from './schema/contrato.schema';

class MockContrato {
  create = jest.fn();
}

describe('Pruebas del repositorio de contrato', () => {
  let service: ContratoRepository;
  let model: Model<ContratoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratoRepository,
        {
          provide: getModelToken(ContratoEntity.name),
          useClass: MockContrato,
        },
      ],
    }).compile();

    service = module.get<ContratoRepository>(ContratoRepository);
    model = module.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Se monta el servicio', () => {
    expect(service).toBeTruthy();
  });

  it('Devuelve un contrato con ID de mongo', async () => {
    const mockDto: ContratoDTO = {
      _id: 'mongo-id',
      ...construirContrato({
        titulo: 'titulo-irrelevante',
      }),
    };
    jest.spyOn(model, 'create').mockImplementationOnce(() => Promise.resolve(mockDto));
    const contratoConId = construirContrato({ titulo: 'titulo-irrelevante', id: 'mongo-id' });

    const contrato = await service.create(construirContrato({ titulo: 'titulo-irrelevante' }));

    expect(contrato).toStrictEqual(contratoConId);
  });
});
