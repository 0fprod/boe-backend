import { ListaDeDefinicion } from '../../../src/compartido/api-models';

export const MockBeneficiariosSinLote: ListaDeDefinicion = {
  dt: ['3. Descripción de la licitación:', '5. Adjudicatarios:', '6. Valor de las ofertas:'],
  dd: [
    'Catalogación de series cartográficas del siglo xx, cartografía de España siglo xx en gran formato y cartas náuticas (CPV: 79995200).',
    {
      dl: {
        dt: ['5.1) Nombre:', '5.2) Número de identificación fiscal:', '5.7) País:', '5.13)'],
        dd: ['Gestión de Archivos y Documentación, S.L. (GesArDoc).', 'B87140331.', 'España.', 'El adjudicatario es una PYME.'],
      },
    },
    {
      dl: {
        dt: '6.1) Valor de la oferta seleccionada:',
        dd: '14.876,03 euros.',
      },
    },
  ],
};
