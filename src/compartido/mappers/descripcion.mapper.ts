import { esValida, extraerDescripcionPorTermino } from '../../utils';
import { ListaDeDefinicion, Termino, Texto } from '../api-models';

const DESCRIPCION = 'Descripción de la licitación';
const DESCRIPCION_GENERICA = 'Descripción genérica';

export const descripcionMapper = (lista: ListaDeDefinicion): string => {
  if (!esValida(lista)) {
    return '';
  }

  const descripciones = <Texto | Termino>extraerDescripcionPorTermino(lista, DESCRIPCION);

  if (typeof descripciones !== 'string') {
    const descripcionGenerica = <Termino>extraerDescripcionPorTermino(descripciones.dl, DESCRIPCION_GENERICA);
    return descripcionGenerica ?? (descripciones.dl.dd[0] as string);
  }

  return descripciones as string;
};
