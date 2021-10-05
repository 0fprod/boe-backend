import { Descripcion, ListaDeDefinicion, Termino } from './models';

export const esValida = (lista: ListaDeDefinicion) => lista && Object.keys(lista).length > 0;

export const extraerIndice = (terminos: Termino | Termino[], termino: Termino): number => {
  if (!Array.isArray(terminos)) {
    return 0;
  }
  const terminosNormalizados = terminos.map((termino) => termino.replace(/[\d\.:\)]/g, '').trim());
  return terminosNormalizados.indexOf(termino);
};

export const extraerDescripcionPorTermino = (lista: ListaDeDefinicion, termino: Termino): Descripcion => {
  const { dd: descripciones, dt: terminos } = lista;

  const indice = extraerIndice(terminos, termino);
  if (indice === -1) return '';

  if (!Array.isArray(descripciones) && indice === 0) {
    return descripciones;
  }

  return descripciones[indice];
};
