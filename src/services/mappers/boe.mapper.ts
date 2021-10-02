import { Boe, construirBoe } from '@repositories/models';
import { Item, Seccion, Sumario } from '@services/models';

/*
En un sumario vienen muchas más secciones y tipos de contratos como, licitaciones, actualizaciones..etc
En este caso sólo nos interesan los contratos formalizados para luego con ese ID pedir detalle de cada uno de ellos
*/
const SECCION_5A = '5A';
const FORMALIZACION_CONTRATOS = 'Anuncio de formalización de contratos';

const esValida = (entrada: Sumario) => entrada && Object.keys(entrada).length > 0;
const extraerSeccionAnuncios = (entrada: Sumario) => entrada.diario.seccion.find(({ num }) => num === SECCION_5A);
const extaerItemsDeDepartamentos = (seccion?: Seccion) => (seccion ? seccion.departamento.map(({ item }) => item).flat() : []);
const esFormalizacion = (titulo: string) => titulo.includes(FORMALIZACION_CONTRATOS);

export const boeMapper = (entrada: Sumario): Boe => {
  if (esValida(entrada)) {
    const seccionAnuncios5A = extraerSeccionAnuncios(entrada);
    const items: Item[] = extaerItemsDeDepartamentos(seccionAnuncios5A);
    const idContratos: string[] = items.reduce((acc: string[], { titulo, id }: Item) => (esFormalizacion(titulo) ? [...acc, id] : acc), []);

    return construirBoe(idContratos);
  }

  return construirBoe();
};
