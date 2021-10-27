import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../../test/mocks/services/repository.mock';
import { ContratoRepository } from '../compartido/contrato.repository';
import { construirContrato } from '../compartido/models';
import { ContratosService } from './contratos.service';

describe('ContratosService', () => {
  let servicio: ContratosService;
  let repositorio: ContratoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContratosService,
        {
          provide: ContratoRepository,
          useClass: MockRepository,
        },
      ],
    }).compile();

    servicio = module.get<ContratosService>(ContratosService);
    repositorio = module.get<ContratoRepository>(ContratoRepository);
  });

  it('Se monta el servicio', () => {
    expect(servicio).toBeDefined();
  });

  it('Devuelve un contrato dado un id de contrato', async () => {
    jest.spyOn(repositorio, 'obtenerContratoPorId').mockReturnValue(Promise.resolve(construirContrato({ contratoId: 'contratoId' })));
    const contrato = await servicio.obtenerContratoPorId('contratoId');
    expect(contrato).toBeTruthy();
    expect(contrato.contratoId).toEqual('contratoId');
  });
});
