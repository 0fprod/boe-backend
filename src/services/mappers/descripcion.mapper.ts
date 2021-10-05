import { ListaDeDefinicion, Termino, Texto } from '@services/models';
import { esValida, extraerDescripcionPorTermino } from '@services/utils';

const DESCRIPCION = 'Descripción de la licitación';
const DESCRIPCION_GENERICA = 'Descripción genérica';

export const descripcionMapper = (lista: ListaDeDefinicion): string => {
  if (!esValida(lista)) {
    return '';
  }

  const descripciones = <Texto>extraerDescripcionPorTermino(lista, DESCRIPCION);
  const descripcionGenerica = <Termino>extraerDescripcionPorTermino(descripciones.dl, DESCRIPCION_GENERICA);

  return descripcionGenerica ?? (descripciones.dl.dd[0] as string);
};
