import { Contrato } from '../models';
import { ContratoDoc } from '../schema/contrato.schema';

export const mapDocumentAContrato = (contratoModel: ContratoDoc): Contrato => ({
  contratoId: contratoModel.contratoId,
  fechaPub: contratoModel.fechaPub,
  id: contratoModel._id,
  titulo: contratoModel.titulo,
  urlPdf: contratoModel.urlPdf,
  detalles: { ...contratoModel.detalles },
});
