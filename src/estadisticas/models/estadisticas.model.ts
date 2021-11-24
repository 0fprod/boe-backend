export interface Estadistica {
  etiqueta: string;
  valor: number;
}

export const mapNumContratosPorBeneficiario = (doc: any): Estadistica => ({
  etiqueta: doc._id,
  valor: doc.numVeces,
});
