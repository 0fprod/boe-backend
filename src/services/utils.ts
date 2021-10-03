import { ListaDeDefinicion, Termino } from './models';

export const esValida = (lista: ListaDeDefinicion) => lista && Object.keys(lista).length > 0;

export const extraerIndice = (terminos: Termino[], termino: Termino) => {
  const terminosNormalizados = terminos.map((termino) => termino.replace(/[\d\.:\)]/g, '').trim());
  return terminosNormalizados.indexOf(termino);
};

export const extraerDescripcionPorTermino = (lista: ListaDeDefinicion, termino: Termino): string => {
  const { dd: descripciones, dt: terminos } = lista;

  const indice = extraerIndice(terminos, termino);
  if (indice === -1) return '';

  return (descripciones as Termino[])[indice];
};
