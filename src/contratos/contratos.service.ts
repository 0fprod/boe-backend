import { Injectable } from '@nestjs/common';
import { ContratoRepository } from '../compartido/contrato.repository';
import { Contrato } from '../compartido/models';

@Injectable()
export class ContratosService {
  private readonly EN_PUNTO = 'T00:00:00.000Z';
  constructor(private repositorio: ContratoRepository) {}

  obtenerContratoPorId(idContrato: string): Promise<Contrato> {
    return this.repositorio.obtenerContratoPorId(idContrato);
  }

  obtenerContratoPorFecha(fechaPub: string): Promise<Contrato[]> {
    // añadir la hora a la fecha
    fechaPub = fechaPub + this.EN_PUNTO;
    return this.repositorio.obtenerContratoPorFecha(fechaPub);
  }

  obtenerContratoPorRangoFecha(fechaPubInicio: string, fechaPubFin: string): Promise<Contrato[]> {
    return this.repositorio.obtenerContratoPorRangoDeFecha(fechaPubInicio, fechaPubFin);
  }
}
