import { Injectable } from '@nestjs/common';
import { EstadisticasRepository } from './estadisticas.repository';
import { Estadistica, mapEstadisticaActividad, mapEstadisticaPYMES, mapNumContratosPorBeneficiario } from './models/estadisticas.model';

@Injectable()
export class EstadisticasService {
  constructor(private repositorio: EstadisticasRepository) {}

  async getTopBeneficiariosPorFecha(fechaInicio: string, fechafinal: string): Promise<Estadistica[]> {
    try {
      const estadisticas = await this.repositorio.getTopBeneficiariosPorFecha(fechaInicio, fechafinal);
      return estadisticas.map(mapNumContratosPorBeneficiario);
    } catch (error) {
      console.log('Error ->', error);
      return [];
    }
  }
  async getGastosPorPymes(fechaInicio: string, fechafinal: string): Promise<Estadistica[]> {
    try {
      const estadisticas = await this.repositorio.estadisticasPyme(fechaInicio, fechafinal);
      return estadisticas.map(mapEstadisticaPYMES);
    } catch (error) {
      console.log('Error ->', error);
      return [];
    }
  }
  async getGastosPorActividad(fechaInicio: string, fechafinal: string): Promise<Estadistica[]> {
    try {
      const estadisticas = await this.repositorio.estadisticasPorActividad(fechaInicio, fechafinal);
      return estadisticas.map(mapEstadisticaActividad);
    } catch (error) {
      console.log('Error ->', error);
      return [];
    }
  }
}
