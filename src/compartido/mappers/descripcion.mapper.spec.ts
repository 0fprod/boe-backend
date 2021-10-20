import { mockDeBeneficiarioAnidado } from '@test/mocks/ts/beneficiario-anidado';
import { ListaDeDefinicion } from 'src/compartido/api-models';
import { descripcionMapper } from './descripcion.mapper';

describe('Descripcion Specs', () => {
  it.each([undefined, null, '', {}, []])('Devuelve cadena vacía si los argumentos son inválidos [%s]', (parametroInvalido) => {
    expect(descripcionMapper(parametroInvalido as ListaDeDefinicion)).toEqual('');
  });

  it('Devuelve la descripcion principal de un documento', () => {
    expect(descripcionMapper(mockDeBeneficiarioAnidado)).toEqual(
      'Selección de empresas para el suministro de material de ferretería, eléctrico, construcción, fontanería y repuestos de automoción a las BAE,S ubicadas dentro del ámbito de la JIAE ESTE.',
    );
  });
});
