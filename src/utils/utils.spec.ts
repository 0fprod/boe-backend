import { dividirEn, getColeccionDeFechas } from '.';
import { Descripcion, ListaDeDefinicion } from '../compartido/api-models';
import { Lote } from '../compartido/models';
import {
  buscarLotes,
  costeMapper,
  esLote,
  esNivelPlano,
  esValida,
  extraerDescripcionPorTermino,
  extraerIndice,
  extraerIndicePorLote,
  fechaPublicacionMapper,
  getNivelPlano,
  tituloMapper,
} from './utils';

describe('Utils specs', () => {
  it('Devuelve un boolean si la entrada de datos es valida o inválida', () => {
    expect(esValida({ dd: [], dt: [] })).toBeTruthy();
    expect(esValida(undefined as ListaDeDefinicion)).toBeFalsy();
    expect(esValida({} as ListaDeDefinicion)).toBeFalsy();
  });

  it('Devuelve un boolean si la entrada es un lote', () => {
    expect(esLote('1) Lote 1: Descripción irrelevante')).toBeTruthy();
    expect(esLote('Descripción irrelevante')).toBeFalsy();
  });

  it('Devuelve un boolean si la entrada es un nivel plano (no es anidado)', () => {
    expect(esNivelPlano([''])).toBeTruthy();
    expect(esNivelPlano('')).toBeTruthy();
    expect(esNivelPlano([])).toBeFalsy();
    expect(esNivelPlano([{ dl: { dd: [], dt: '' } }])).toBeFalsy();
  });

  it('Obtiene en nivel plano de una lista de definición anidada', () => {
    const nivelPlano: ListaDeDefinicion = {
      dd: ['plano'],
      dt: ['plano'],
    };
    const listaAnidadaSimple: ListaDeDefinicion = {
      dd: [{ dl: { ...nivelPlano } }],
      dt: ['anidado'],
    };
    const listaAnidada: ListaDeDefinicion = {
      dd: [{ dl: { dd: [{ dl: { ...nivelPlano } }], dt: [''] } }],
      dt: ['anidado'],
    };
    expect(getNivelPlano(listaAnidadaSimple)).toStrictEqual([nivelPlano]);
    expect(getNivelPlano(listaAnidada)).toStrictEqual([nivelPlano]);
    expect(getNivelPlano(undefined as ListaDeDefinicion)).toStrictEqual([]);
  });

  it('Extrae un índice dado una lista de definición y un término', () => {
    expect(extraerIndice('', 'termino')).toEqual(0);
    expect(extraerIndice(['irrelevante', 'termino'], 'termino')).toEqual(1);
    expect(extraerIndice(['irrelevante', 'termino'], 'no-existe')).toEqual(-1);
  });

  it('Extrae un índice dado un lote', () => {
    expect(extraerIndicePorLote('', 'lote')).toEqual(-1);
    expect(extraerIndicePorLote('lote 1', 'lote 1')).toEqual(0);
    expect(extraerIndicePorLote('lote 1', 'lote 2')).toEqual(-1);
    expect(extraerIndicePorLote(['irrelevante'], 'lote')).toEqual(-1);
    expect(extraerIndicePorLote(['lote 1'], 'lote 1')).toEqual(0);
    expect(extraerIndicePorLote(['lote 1', 'lote 2'], 'lote 2')).toEqual(1);
  });

  it('Extrae una descripción dado un término', () => {
    const mockSubDescripcion: Descripcion = { dl: { dd: ['descripcion-segundo'], dt: ['termino-segundo'] } };
    const mockListaDeDefinicion: ListaDeDefinicion = {
      dd: ['primero', mockSubDescripcion],
      dt: ['primero', 'segundo', 'tercero'],
    };

    expect(extraerDescripcionPorTermino(mockListaDeDefinicion, 'primero')).toEqual('primero');
    expect(extraerDescripcionPorTermino(mockListaDeDefinicion, 'segundo')).toStrictEqual(mockSubDescripcion);
    expect(extraerDescripcionPorTermino(mockListaDeDefinicion, 'tercero')).toStrictEqual('');
    expect(extraerDescripcionPorTermino(mockListaDeDefinicion, 'cuarto')).toStrictEqual('');
  });

  it('Devuelve lotes dado una descripción', () => {
    const mockDescripcion: Descripcion = {
      dl: { dd: ['Lote 1: Descrip 1', 'Lote 2: Descrip 2', 'Lote 3: Descrip 3'], dt: ['1', '2', '3'] },
    };
    const lotes: Lote[] = [
      {
        id: 'Lote 1',
        descripcion: 'Descrip 1',
      },
      {
        id: 'Lote 2',
        descripcion: 'Descrip 2',
      },
      {
        id: 'Lote 3',
        descripcion: 'Descrip 3',
      },
    ];
    expect(buscarLotes(mockDescripcion)).toStrictEqual(lotes);
    expect(buscarLotes({ dl: { dd: ['Lote 1 Descrip 1', 'Lote 2 Descrip 2', 'Lote 3 Descrip 3'], dt: ['1', '2', '3'] } })).toStrictEqual(
      [],
    );
    expect(buscarLotes({ dl: { dd: [''], dt: ['1'] } })).toStrictEqual([]);
  });

  it('Transforma un string con la moneda en digitos', () => {
    expect(costeMapper('')).toEqual(0);
    expect(costeMapper('coste')).toEqual(0);
    expect(costeMapper('1952,33')).toEqual(1952.33);
    expect(costeMapper('1.952,33')).toEqual(1952.33);
    expect(costeMapper('1.952,33 euros')).toEqual(1952.33);
  });

  it('Transforma la fecha en ISO string', () => {
    expect(fechaPublicacionMapper('fecha-invalida')).toEqual('');
    expect(fechaPublicacionMapper('202051')).toEqual('');
    expect(fechaPublicacionMapper('99999999')).toEqual('');
    expect(fechaPublicacionMapper('20203030')).toEqual('');
    expect(fechaPublicacionMapper('20200510')).toEqual('2020-05-10T00:00:00.000Z');
    expect(fechaPublicacionMapper('19900710')).toEqual('1990-07-10T00:00:00.000Z');
    expect(fechaPublicacionMapper('20211201')).toEqual('2021-12-01T00:00:00.000Z');
  });

  it('Elimina un prefijo y un sufijo dado un título', () => {
    expect(tituloMapper('titulo sin formato')).toEqual('');
    expect(tituloMapper('prefijo : titulo sufijo')).toEqual('');
    expect(tituloMapper('prefijo  titulo. sufijo')).toEqual('');
    expect(tituloMapper('Objeto: titulo. Expediente')).toEqual('titulo.');
  });

  it('Divide en varios grupos una coleccion', () => {
    const itemsPorGrupo = 2;

    const coleccionImpar = [1, 2, 3, 4, 5];
    const resultadoImpar = [[1, 2], [3, 4], [5]];

    const coleccionPar = [1, 2, 3, 4, 5, 6];
    const resultadoPar = [
      [1, 2],
      [3, 4],
      [5, 6],
    ];

    expect(dividirEn(0, coleccionImpar)).toStrictEqual([]);
    expect(dividirEn(-1, coleccionImpar)).toStrictEqual([]);
    expect(dividirEn(itemsPorGrupo, [])).toStrictEqual([]);
    expect(dividirEn(itemsPorGrupo, coleccionImpar)).toStrictEqual(resultadoImpar);
    expect(dividirEn(itemsPorGrupo, coleccionImpar)).toStrictEqual(resultadoImpar);
    expect(dividirEn(itemsPorGrupo, coleccionPar)).toStrictEqual(resultadoPar);
    expect(dividirEn(10, coleccionImpar)).toStrictEqual([coleccionImpar]);
  });

  it('Devuelve todas las fechas de un mes dado mes y año', () => {
    const fechasDeFebrero = [
      '20210201',
      '20210202',
      '20210203',
      '20210204',
      '20210205',
      '20210206',
      '20210207',
      '20210208',
      '20210209',
      '20210210',
      '20210211',
      '20210212',
      '20210213',
      '20210214',
      '20210215',
      '20210216',
      '20210217',
      '20210218',
      '20210219',
      '20210220',
      '20210221',
      '20210222',
      '20210223',
      '20210224',
      '20210225',
      '20210226',
      '20210227',
      '20210228',
    ];

    expect(getColeccionDeFechas('202102')).toStrictEqual(fechasDeFebrero);
  });
});
