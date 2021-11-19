export interface EstadisticasBeneficiarios {
  nombre: string;
  numContratos: number;
}

export const mapContratoDocAEstadisticasBeneficiario = (doc: any): EstadisticasBeneficiarios => ({
  nombre: doc._id,
  numContratos: doc.numVeces,
});
