export interface Institucion {
  nombre: string;
  nif: string;
  telefono: string;
  email: string;
  web: string;
  tipoActividad: string;
  actividad: string;
}

export interface Beneficiario {
  nombre: string;
  nif: string;
  esPyme: boolean;
  lote: string;
  coste: number;
  descripcion: string;
}

export interface DetallesDeContrato {
  institucion: Institucion;
  beneficiarios: Beneficiario[];
  descripcion: string;
}

export interface Contrato {
  id: string;
  fechaPub: string;
  titulo: string;
  urlPdf: string;
  detalles: DetallesDeContrato;
}

export interface Lote {
  id: string;
  descripcion: string;
}

export const constuirLote = (texto: string): Lote => {
  const [id, descripcion] = texto.split(/(?<=Lote\s\d:)/gi);
  return {
    id: id.replace(':', '').trim(),
    descripcion: descripcion.replace(/\.$/, '').trim(),
  };
};

export const constuirInstitucion = ({
  tipoActividad = '',
  actividad = '',
  nombre = '',
  nif = '',
  email = '',
  telefono = '',
  web = '',
}: Partial<Institucion>): Institucion => ({
  actividad,
  tipoActividad,
  nombre,
  nif,
  email,
  telefono,
  web,
});

export const construirBeneficiario = ({
  nif = '',
  nombre = '',
  coste = -1,
  esPyme = false,
  descripcion = '',
  lote = '',
}: Partial<Beneficiario>): Beneficiario => ({
  nif,
  nombre,
  coste,
  esPyme,
  lote,
  descripcion,
});

export const construirDetallesDeContrato = ({
  beneficiarios = [],
  descripcion = '',
  institucion = constuirInstitucion({}),
}: Partial<DetallesDeContrato>): DetallesDeContrato => ({
  beneficiarios,
  descripcion,
  institucion,
});

export const constuirContrato = ({
  detalles = construirDetallesDeContrato({}),
  fechaPub = '',
  id = '',
  titulo = '',
  urlPdf = '',
}: Partial<Contrato>): Contrato => ({
  detalles,
  id,
  fechaPub,
  titulo,
  urlPdf,
});
