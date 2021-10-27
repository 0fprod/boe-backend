import { Injectable } from '@nestjs/common';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Contrato } from '../compartido/models';

@Injectable()
export class ContratosService {
  constructor(private repositorio: ContratoRepository) {}

  obtenerContratoPorId(idContrato: string): Promise<Contrato | null> {
    return this.repositorio.obtenerContratoPorId(idContrato);
  }

  // Leer de mongo
  getHello(): string {
    return 'Hello';
  }
}
