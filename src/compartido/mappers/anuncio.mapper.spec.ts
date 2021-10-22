import { readFileSync } from 'fs';
import { contratoAnidadoMapeado } from '../../../test/mocks/ts/contrato-anidado-mapeado';
import { contratoPlanoMapeado } from '../../../test/mocks/ts/contrato-plano-mapeado';
import { Anuncio } from '../api-models';
import { construirContrato, Contrato } from '../models';
import { anuncioMapper } from './anuncio.mapper';

describe('Anuncio Mapper specs', () => {
  it.each([undefined, null, {}, []])('Devuelve un contrato vacío si el parámetro es [%s]', (parametroInvalido) => {
    const contratoVacio = construirContrato({});
    expect(anuncioMapper(parametroInvalido as Anuncio)).toStrictEqual(contratoVacio);
  });

  it('Transforma un Anuncio anidado en un Contrato', () => {
    const boe = readFileSync('./test/mocks/json/anuncio-licitacion-anidado.json', { encoding: 'utf-8' });
    const contrato: Contrato = anuncioMapper(JSON.parse(boe));
    expect(contrato).toStrictEqual(contratoAnidadoMapeado);
  });

  it('Transforma un Anuncio plano en un Contrato', () => {
    const boe = readFileSync('./test/mocks/json/anuncio-licitacion-plano.json', { encoding: 'utf-8' });
    const contrato: Contrato = anuncioMapper(JSON.parse(boe));
    expect(contrato).toStrictEqual(contratoPlanoMapeado);
  });
});
