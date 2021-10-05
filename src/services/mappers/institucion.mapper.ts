import { constuirInstitucion, Institucion } from '@repositories/models';
import { ListaDeDefinicion, Texto } from '@services/models';
import { esValida, extraerDescripcionPorTermino, extraerIndice } from '@services/utils';

const PODER_ADJUDICADOR = 'Poder adjudicador';
const NOMBRE = 'Nombre';
const NIF = 'Número de identificación fiscal';
const TELEFONO = 'Teléfono';
const EMAIL = 'Correo electrónico';
const WEB = 'Dirección principal';

const TIPO_PODER_ACTIVIDAD = 'Tipo de poder adjudicador y principal actividad ejercida';
const TIPO = 'Tipo';
const ACTIVIDAD = 'Actividad principal ejercida';

export const institucionMapper = (lista: ListaDeDefinicion): Institucion => {
  if (!esValida(lista)) {
    return constuirInstitucion({});
  }

  const { dd: descripciones, dt: terminos } = lista;

  const indiceDelPoderAdjudicador = extraerIndice(terminos, PODER_ADJUDICADOR);
  const indiceDelTipoActividad = extraerIndice(terminos, TIPO_PODER_ACTIVIDAD);
  let institucion = constuirInstitucion({});

  if (indiceDelPoderAdjudicador !== -1) {
    const { dl } = descripciones[indiceDelPoderAdjudicador] as Texto;
    const nombre = <string>extraerDescripcionPorTermino(dl, NOMBRE);
    const nif = <string>extraerDescripcionPorTermino(dl, NIF);
    const telefono = <string>extraerDescripcionPorTermino(dl, TELEFONO);
    const email = <string>extraerDescripcionPorTermino(dl, EMAIL);
    const web = <string>extraerDescripcionPorTermino(dl, WEB);

    institucion = constuirInstitucion({
      nombre,
      nif,
      telefono,
      email,
      web,
    });
  }

  if (indiceDelTipoActividad !== -1) {
    const { dl } = descripciones[indiceDelTipoActividad] as Texto;
    const tipoActividad = <string>extraerDescripcionPorTermino(dl, TIPO);
    const actividad = <string>extraerDescripcionPorTermino(dl, ACTIVIDAD);

    institucion = constuirInstitucion({
      ...institucion,
      tipoActividad,
      actividad,
    });
  }

  return institucion;
};
