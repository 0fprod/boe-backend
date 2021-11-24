import { EstadisticaApiModel } from './api.model';

export interface Estadistica {
  etiqueta: string;
  valor: number;
}

export const mapNumContratosPorBeneficiario = (doc: EstadisticaApiModel): Estadistica => ({
  etiqueta: doc._id,
  valor: doc.total,
});

export const mapEstadisticaPYMES = (doc: EstadisticaApiModel): Estadistica => ({
  etiqueta: doc._id ? 'PYME' : 'No PYME',
  valor: doc.total,
});

export const mapEstadisticaActividad = (doc: EstadisticaApiModel): Estadistica => ({
  etiqueta: doc._id ? doc._id : 'Sin actividad.',
  valor: doc.total,
});
