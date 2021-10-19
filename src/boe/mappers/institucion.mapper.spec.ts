import { ListaDeDefinicion } from '@boe/api-models';
import { constuirInstitucion } from '@contratos/models';
import { institucionMapper } from './institucion.mapper';

describe('Institucion Mapper specs', () => {
  it.each([undefined, null, {}, []])('Devuelve un contrato vacío si el parámetro es [%s]', (parametroInvalido) => {
    const institucionVacia = constuirInstitucion({});
    expect(institucionMapper(parametroInvalido as ListaDeDefinicion)).toStrictEqual(institucionVacia);
  });

  it('Extrae de una lista de definicion una institucion', () => {
    const ListaDeDefinicion: ListaDeDefinicion = {
      dd: [
        {
          dl: {
            dd: [
              'nombre-irrelevante',
              'nif-irrelevante',
              '-datos-irrelevantes-',
              '-datos-irrelevantes-',
              '-datos-irrelevantes-',
              '-datos-irrelevantes-',
              '-datos-irrelevantes-',
              '-datos-irrelevantes-',
              'telefono-irrelevante',
              'email-irrelevante',
              'web-irrelevante',
              '-datos-irrelevantes-',
            ],
            dt: [
              '1.1) Nombre:',
              '1.2) Número de identificación fiscal:',
              '1.3) Dirección:',
              '1.4) Localidad:',
              '1.5) Provincia:',
              '1.6) Código postal:',
              '1.7) País:',
              '1.8) Código NUTS:',
              '1.9) Teléfono:',
              '1.11) Correo electrónico:',
              '1.12) Dirección principal:',
              '1.13) Dirección del perfil de comprador:',
            ],
          },
        },
        {
          dl: {
            dd: ['tipoactividad-irrelevante', 'actividad-irrelevante'],
            dt: ['2.1) Tipo:', '2.2) Actividad principal ejercida:'],
          },
        },
      ],
      dt: ['Poder adjudicador', 'Tipo de poder adjudicador y principal actividad ejercida'],
    };

    const institucion = constuirInstitucion({
      actividad: 'actividad-irrelevante',
      email: 'email-irrelevante',
      nif: 'nif-irrelevante',
      nombre: 'nombre-irrelevante',
      tipoActividad: 'tipoactividad-irrelevante',
      telefono: 'telefono-irrelevante',
      web: 'web-irrelevante',
    });

    expect(institucionMapper(ListaDeDefinicion)).toStrictEqual(institucion);
  });
});
