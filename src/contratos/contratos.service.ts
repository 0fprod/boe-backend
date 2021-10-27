import { Injectable } from '@nestjs/common';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Contrato } from '../compartido/models';

@Injectable()
export class ContratosService {
  constructor(private repositorio: ContratoRepository) {}

  obtenerContratoPorId(idContrato: string): Promise<Contrato> {
    return this.repositorio.obtenerContratoPorId(idContrato);
  }
}
