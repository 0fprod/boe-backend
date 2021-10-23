import { fechaPublicacionMapper, tituloMapper } from '../../utils';
import { Anuncio } from '../api-models';
import { construirContrato, construirDetallesDeContrato, Contrato } from '../models';
import { beneficiarioMapper } from './beneficiario.mapper';
import { descripcionMapper } from './descripcion.mapper';
import { institucionMapper } from './institucion.mapper';

const esValida = (entrada: Anuncio) => entrada && entrada.metadatos && entrada.texto;

export const mapAnuncioAContrato = (entrada: Anuncio): Contrato => {
  if (esValida(entrada)) {
    const { texto } = entrada;

    return construirContrato({
      detalles: construirDetallesDeContrato({
        institucion: institucionMapper(texto.dl),
        beneficiarios: beneficiarioMapper(texto.dl),
        descripcion: descripcionMapper(texto.dl),
      }),
      fechaPub: fechaPublicacionMapper(entrada.metadatos.fecha_publicacion),
      id: entrada.metadatos.identificador,
      titulo: tituloMapper(entrada.metadatos.titulo),
      urlPdf: entrada.metadatos.url_pdf,
    });
  }
  return construirContrato({});
};
