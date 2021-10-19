import { Contrato } from 'src/contratos/models';

export const contratoPlanoMapeado: Contrato = {
  detalles: {
    beneficiarios: [
      {
        nif: 'B36007409.',
        nombre: 'MERCASH SAR, S.L.U.',
        coste: 36362.73,
        esPyme: false,
        lote: 'Lote 1',
        descripcion: 'Lote 1 Carne fresca, salazón, aves y embutidos',
      },
    ],
    descripcion:
      'Suministro Abierto de viveres para alimentacion de los residentes de la Residencia de Estudiantes de la Armada ``Teniente General Barroso´´.',
    institucion: {
      actividad: 'Defensa.',
      tipoActividad: 'Administración General del Estado.',
      nombre: 'Intendente de Ferrol.',
      nif: 'S1515003J.',
      email: 'a3jucofer@fn.mde.es',
      telefono: '981336207.',
      web: '',
    },
  },
  id: 'BOE-B-2020-27644',
  fechaPub: '2020-08-31T00:00:00.000Z',
  titulo: 'Intendente de Ferrol',
  urlPdf: '/boe/dias/2020/08/31/pdfs/BOE-B-2020-27644.pdf',
};
