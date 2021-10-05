import { constuirLote, Lote } from '@repositories/models';
import { Descripcion, ListaDeDefinicion, Termino, Texto } from './models';

export const esValida = (lista: ListaDeDefinicion) => lista && Object.keys(lista).length > 0;

export const extraerIndice = (terminos: Termino | Termino[], termino: Termino): number => {
  if (!Array.isArray(terminos)) {
    return 0;
  }
  const terminosNormalizados = terminos.map((termino) => termino.replace(/[\d\.:\)]/g, '').trim());
  return terminosNormalizados.indexOf(termino);
};

export const extraerIndicePorLote = (lotes: Termino | Termino[], numLote: Termino): number => {
  if (!Array.isArray(lotes)) {
    return 0;
  }
  return lotes.findIndex((lote) => lote.match(numLote));
};

type ExtractorIndice = (lotes: Termino | Termino[], numLote: Termino) => number;

export const extraerDescripcionPorTermino = (
  lista: ListaDeDefinicion,
  termino: Termino,
  fnExtractor: ExtractorIndice = extraerIndice,
): Descripcion => {
  const { dd: descripciones, dt: terminos } = lista;

  const indice = fnExtractor(terminos, termino);
  if (indice === -1) return '';

  if (!Array.isArray(descripciones) && indice === 0) {
    return descripciones;
  }

  return descripciones[indice];
};

export const esNivelPlano = (dd: ListaDeDefinicion['dd']): boolean => dd && dd.length && typeof dd[0] === 'string';

export const esLote = (texto: string): boolean => texto.indexOf('Lote') !== -1;

export const obtenerNivelPlano = (lista: ListaDeDefinicion): ListaDeDefinicion[] => {
  const { dd, dt } = lista;
  let total = [];

  if (esNivelPlano(dd)) {
    return [{ dd, dt }];
  }

  for (const iterator of dd) {
    const element: ListaDeDefinicion = (iterator as Texto).dl;
    total = [...total, ...obtenerNivelPlano(element)];
  }

  return total;
};

export const buscarLotes = (descripcion: Descripcion): Lote[] => {
  const {
    dl: { dd },
  } = descripcion as Texto;

  if (Array.isArray(dd)) {
    return dd.reduce((lotes: Lote[], termino: Termino) => (esLote(termino) ? [...lotes, constuirLote(termino)] : [...lotes]), []);
  }

  return [];
};

// formato xx.xxx,yyy euros
export const costeMapper = (coste: string) => {
  // quitamos separador de miles
  coste = coste.replace('.', '');
  // sustituimos separador de decimales
  coste = coste.replace(',', '.');
  // quitamos la moneda
  return Number(coste.split(' ')[0]);
};
