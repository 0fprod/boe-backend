import { Beneficiario, construirBeneficiario, Lote } from '@repositories/models';
import { ListaDeDefinicion, Texto } from '@services/models';
import { buscarLotes, costeMapper, esValida, extraerDescripcionPorTermino, extraerIndicePorLote, obtenerNivelPlano } from '@services/utils';

const DESCRIPCION = 'Descripción de la licitación';
const VALOR_OFERTAS = 'Valor de las ofertas';
const OFERTA_SELECCIONADA = 'Valor de la oferta seleccionada';
const ADJUDICATARIOS = 'Adjudicatarios';
const NOMBRE = 'Nombre';
const NIF = 'Número de identificación fiscal';
const PYME = 'El adjudicatario es una PYME';

const esPyme = (lista: ListaDeDefinicion): boolean => {
  if (Array.isArray(lista.dd) && lista.dd.length && typeof lista.dd[0] === 'string') {
    return lista.dd.some((v: string) => v.match(PYME));
  }
  return false;
};

const construirBeneficiariosConCostes = (
  listaBeneficiario: ListaDeDefinicion,
  listaCoste: ListaDeDefinicion,
  { id: lote, descripcion }: Lote,
): Beneficiario => {
  const nombre = extraerDescripcionPorTermino(listaBeneficiario, NOMBRE) as string;
  const nif = extraerDescripcionPorTermino(listaBeneficiario, NIF) as string;
  const pyme = esPyme(listaBeneficiario);
  const coste = extraerDescripcionPorTermino(listaCoste, OFERTA_SELECCIONADA) as string;

  return construirBeneficiario({ nombre, nif, esPyme: pyme, lote: lote, descripcion, coste: costeMapper(coste) });
};

const buscarBeneficiariosPorLote = (adjudicatarios: Texto, costes: Texto, lote: Lote): Beneficiario[] => {
  const textoAdjudicatarios = <Texto>extraerDescripcionPorTermino(adjudicatarios.dl, lote.id, extraerIndicePorLote);
  const textoCostes = <Texto>extraerDescripcionPorTermino(costes.dl, lote.id, extraerIndicePorLote);
  const beneficiariosPlanos: ListaDeDefinicion[] = obtenerNivelPlano(textoAdjudicatarios.dl);
  const costesPlanos: ListaDeDefinicion[] = obtenerNivelPlano(textoCostes.dl);

  // Ambas colecciones están ordenadas siempre.
  const beneficiarios = beneficiariosPlanos.map((beneficiarioPlano, indice) => {
    const costePlano = costesPlanos[indice];
    return construirBeneficiariosConCostes(beneficiarioPlano, costePlano, lote);
  });

  return beneficiarios;
};

export const beneficiarioMapper = (lista: ListaDeDefinicion): Beneficiario[] => {
  if (!esValida(lista)) {
    return [];
  }

  const descripciones = extraerDescripcionPorTermino(lista, DESCRIPCION);
  const adjudicatarios = extraerDescripcionPorTermino(lista, ADJUDICATARIOS);
  const valorDeOfertas = extraerDescripcionPorTermino(lista, VALOR_OFERTAS);

  const lotes = buscarLotes(descripciones);
  const beneficiarios = lotes.map((lote) => buscarBeneficiariosPorLote(adjudicatarios as Texto, valorDeOfertas as Texto, lote)).flat();
  return beneficiarios;
};
