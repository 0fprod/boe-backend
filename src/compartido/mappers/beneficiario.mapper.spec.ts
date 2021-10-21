import { mockDeBeneficiarioAnidado } from '../../../test/mocks/ts/beneficiario-anidado';
import { beneficiarioAnidadoMapeado } from '../../../test/mocks/ts/beneficiario-anidado-mapeado';
import { MockBeneficiariosSinLoteMapeado } from '../../../test/mocks/ts/beneficiario-sin-lote-mapeado';
import { MockBeneficiariosSinLote } from '../../../test/mocks/ts/beneficiarios-sin-lote';
import { ListaDeDefinicion } from '../api-models';
import { Beneficiario } from '../models';
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

  it('Extrae multiples beneficiarios de una lista de definicion sin lotes', () => {
    const beneficiarios: Beneficiario[] = beneficiarioMapper(MockBeneficiariosSinLote);
    expect(beneficiarios).toHaveLength(1);
    expect(beneficiarios).toStrictEqual(MockBeneficiariosSinLoteMapeado);
  });
});
