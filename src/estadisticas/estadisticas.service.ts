import { Injectable } from '@nestjs/common';
import { ContratoRepository } from '../compartido/contrato.repository';
import { EstadisticasBeneficiarios, mapContratoDocAEstadisticasBeneficiario } from './models/estadisticas.model';

@Injectable()
export class EstadisticasService {
  constructor(private repositorio: ContratoRepository) {}

  async obtenerTopBeneficiariosPorFecha(fechaInicio: string, fechafinal: string): Promise<EstadisticasBeneficiarios[]> {
    try {
      const estadisticas = await this.repositorio.obtenerTopBeneficiariosPorFecha(fechaInicio, fechafinal);
      return estadisticas.map(mapContratoDocAEstadisticasBeneficiario);
    } catch (error) {
      console.log('Error ->', error);
      return [];
    }
  }
}
