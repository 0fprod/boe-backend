import { Beneficiario } from '@repositories/models';
import { ListaDeDefinicion } from '@services/models';
import { mockDeBeneficiarioAnidado } from '@test/mocks/ts/beneficiario-anidado';
import { beneficiarioAnidadoMapeado } from '@test/mocks/ts/beneficiario-anidado-mapeado';
import { beneficiarioMapper } from './beneficiario.mapper';

describe('Beneficiario mapper specs ', () => {
  it.each([undefined, null, {}, []])('Devuelve una lista vacía si el parámetro es [%s]', (parametroInvalido) => {
    expect(beneficiarioMapper(parametroInvalido as ListaDeDefinicion)).toStrictEqual([]);
  });
  it('Extrae multiples beneficiarios de una lista de definicion anidada', () => {
    const beneficiarios: Beneficiario[] = beneficiarioMapper(mockDeBeneficiarioAnidado);
    expect(beneficiarios).toHaveLength(121);
    expect(beneficiarios).toStrictEqual(beneficiarioAnidadoMapeado);
  });
});