import { constuirContrato, Contrato } from '@repositories/models';
import { Documento } from '@services/models';
import { contratoAnidadoMapeado } from '@test/mocks/ts/contrato-anidado-mapeado';
import { readFileSync } from 'fs';
import { anuncioMapper } from './anuncio.mapper';

describe('Anuncio Mapper specs', () => {
  it.each([undefined, null, {}, []])('Devuelve un contrato vacío si el parámetro es [%s]', (parametroInvalido) => {
    const contratoVacio = constuirContrato({});
    expect(anuncioMapper(parametroInvalido as Documento)).toStrictEqual(contratoVacio);
  });

  it.only('Transforma un Documento en un Contrato', () => {
    const boe = readFileSync('./test/mocks/json/anuncio-licitacion-1.json', { encoding: 'utf-8' });
    const contrato: Contrato = anuncioMapper(JSON.parse(boe));
    expect(contrato).toStrictEqual(contratoAnidadoMapeado);
  });
});
