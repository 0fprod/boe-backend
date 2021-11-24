import { Injectable } from '@nestjs/common';
import { EstadisticasRepository } from './estadisticas.repository';
import { Estadistica, mapNumContratosPorBeneficiario } from './models/estadisticas.model';

@Injectable()
export class EstadisticasService {
  constructor(private repositorio: EstadisticasRepository) {}

  async obtenerTopBeneficiariosPorFecha(fechaInicio: string, fechafinal: string): Promise<Estadistica[]> {
    try {
      const estadisticas = await this.repositorio.obtenerTopBeneficiariosPorFecha(fechaInicio, fechafinal);
      return estadisticas.map(mapNumContratosPorBeneficiario);
    } catch (error) {
      console.log('Error ->', error);
      return [];
    }
  }
}
