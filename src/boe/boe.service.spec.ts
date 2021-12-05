import { HttpModule } from '@nestjs/axios';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { of } from 'rxjs';
import { mockBoeApiService } from '../../test/mocks/services/boeapi.service.mock';
import { rootMongooseTestModule } from '../../test/mongo.memory.server';
import { BoeApiService } from '../compartido/boe-api.service';
import { ContratoRepository } from '../compartido/contrato.repository';
import { construirBoe, construirContrato } from '../compartido/models';
import { ContratoDoc, ContratoEntity, ContratoSchema } from '../compartido/schema/contrato.schema';
import { BoeService } from './boe.service';

describe('BoeService', () => {
  let service: BoeService;
  let api: BoeApiService;
  let repo: Model<ContratoDoc>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, rootMongooseTestModule(), MongooseModule.forFeature([{ name: ContratoEntity.name, schema: ContratoSchema }])],
      providers: [
        BoeService,
        {
          provide: BoeApiService,
          useClass: mockBoeApiService,
        },
        ContratoRepository,
      ],
    }).compile();

    service = module.get<BoeService>(BoeService);
    api = module.get<BoeApiService>(BoeApiService);
    repo = module.get<Model<ContratoDoc>>(getModelToken(ContratoEntity.name));
  });

  it('Se monta el servicio', () => {
    expect(service).toBeDefined();
  });

  it('Se guardan en base de datos los contratos del día', async () => {
    jest.spyOn(api, 'obtenerBoe').mockReturnValue(of(construirBoe(['id-irrelevante-1', 'id-irrelevante-2'])));
    jest.spyOn(api, 'obtenerContrato').mockReturnValueOnce(
      of(
        construirContrato({
          contratoId: 'id-irrelevante-1',
          titulo: 'contrato-irrelevante',
        }),
      ),
    );
    jest.spyOn(api, 'obtenerContrato').mockReturnValue(
      of(
        construirContrato({
          contratoId: 'id-irrelevante-2',
          titulo: 'contrato-irrelevante',
        }),
      ),
    );
    jest.spyOn(console, 'log').mockImplementation(() => {
      /*noop*/
    });

    const totalContratosGuardados = await service.guardarContratosPorBoeId('id-irrelevante');
    const totalContratosEnBDD = await repo.find({});

    expect(totalContratosGuardados).toEqual(2);
    expect(totalContratosEnBDD).toHaveLength(2);
  });
});
