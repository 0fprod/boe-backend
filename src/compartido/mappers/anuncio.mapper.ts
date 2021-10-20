import { Anuncio } from '@compartido/api-models';
import { construirDetallesDeContrato, constuirContrato, Contrato } from '@compartido/models';
import { fechaPublicacionMapper, tituloMapper } from '@utils/utils';
import { beneficiarioMapper } from './beneficiario.mapper';
import { descripcionMapper } from './descripcion.mapper';
import { institucionMapper } from './institucion.mapper';

const esValida = (entrada: Anuncio) => entrada && entrada.metadatos && entrada.texto;

export const anuncioMapper = (entrada: Anuncio): Contrato => {
  if (esValida(entrada)) {
    const { texto } = entrada;

    return constuirContrato({
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
  return constuirContrato({});
};
