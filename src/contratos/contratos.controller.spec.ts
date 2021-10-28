import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MockRepository } from '../../test/mocks/services/repository.mock';
import { ContratoRepository } from '../compartido/contrato.repository';
import { ContratosController } from './contratos.controller';
import { ContratosService } from './contratos.service';

describe('ContratosController', () => {
  let controlador: ContratosController;
  let repositorio: ContratoRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContratosController],
      providers: [
        ContratosService,
        {
          provide: ContratoRepository,
          useClass: MockRepository,
        },
      ],
    }).compile();

    controlador = module.get<ContratosController>(ContratosController);
    repositorio = module.get<ContratoRepository>(ContratoRepository);
  });

  it('Se monta el controlador', () => {
    expect(controlador).toBeDefined();
  });

  it('Devuelve 404 cuando no existe el contrato', async () => {
    jest.spyOn(repositorio, 'obtenerContratoPorId').mockResolvedValue(null);
    await expect(controlador.getId('id-invalido')).rejects.toThrowError(NotFoundException);
  });
});
