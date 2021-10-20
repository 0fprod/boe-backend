import { constuirLote, Lote } from '@compartido/models';
import { Descripcion, ListaDeDefinicion, Termino, Texto } from '../compartido/api-models';

type ExtractorIndice = (lotes: Termino | Termino[], numLote: Termino) => number;

export const esValida = (lista: ListaDeDefinicion): boolean => lista && Object.keys(lista).length > 0;
// Se considera nivel plano ciando la lista DD contiene string y no Texto *ver modelo*
export const esNivelPlano = (dd: ListaDeDefinicion['dd']): boolean => {
  if (Array.isArray(dd) && dd.length && typeof dd[0] === 'string') return true;
  if (!Array.isArray(dd) && typeof dd === 'string') return true;
  return false;
};
export const esLote = (texto: string): boolean => texto.indexOf('Lote') !== -1;

export const extraerIndice = (terminos: Termino | Termino[], termino: Termino): number => {
  if (!Array.isArray(terminos)) {
    return 0;
  }
  const terminosNormalizados = terminos.map((termino) => termino.replace(/[\d\.:\)]/g, '').trim());
  return terminosNormalizados.indexOf(termino);
};

export const extraerIndicePorLote = (lotes: Termino | Termino[], numLote: Termino): number => {
  if (!Array.isArray(lotes)) {
    return lotes.match(numLote) ? 0 : -1;
  }
  const lote = lotes.findIndex((lote) => lote.match(numLote));
  return lote;
};

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

  return descripciones[indice] ?? '';
};

// Navega recursivamente hasta llegar a un nivel plano,
// en la salida de la recursión los va añadiendo a una lista
export const obtenerNivelPlano = (lista: ListaDeDefinicion): ListaDeDefinicion[] => {
  try {
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
  } catch (err) {
    return [];
  }
};

export const buscarLotes = (descripcion: Descripcion): Lote[] => {
  if (typeof descripcion === 'string') {
    return [{ descripcion, id: '' }];
  }

  const {
    dl: { dd },
  } = descripcion as Texto;

  if (Array.isArray(dd)) {
    return dd.reduce((lotes: Lote[], termino: Termino) => {
      const lote = constuirLote(termino);

      return esLote(termino) && lote ? [...lotes, lote] : [...lotes];
    }, []);
  }

  return [];
};

// formato xx.xxx,yyy euros
export const costeMapper = (coste: string): number => {
  try {
    // quitamos separador de miles
    coste = coste.replace('.', '');
    // sustituimos separador de decimales
    coste = coste.replace(',', '.');
    // quitamos la moneda
    const [precio] = coste.split(' ');
    const digito = Number(precio);
    return isNaN(digito) ? 0 : digito;
  } catch {
    return 0;
  }
};

// Formato: Prefijo : Titulo. Sufijo
export const tituloMapper = (titulo: string): string => {
  const prefijo = 'Objeto:';
  const sufijo = 'Expediente';
  const indicePrefijo = titulo.indexOf(prefijo);
  const indiceSufijo = titulo.indexOf(sufijo);
  if (indicePrefijo === -1 || indiceSufijo === -1) return '';
  return titulo.substring(indicePrefijo + prefijo.length, indiceSufijo).trim();
};

// Formato AAAAMMDD
export const fechaPublicacionMapper = (fecha: string): string => {
  if (!fecha) return '';
  try {
    const fechaConSeparador = fecha.replace(/(\d{4})(\d{2})/g, '$1-$2-');
    return new Date(fechaConSeparador).toISOString();
  } catch (err) {
    return '';
  }
};
