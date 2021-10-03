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
  direccion: string;
  localidad: string;
  codigoPostal: number;
  pais: string;
  esPyme: boolean;
  lote: number;
  coste: number;
}

export interface DetallesDeContrato {
  fecha?: Date;
  institucion: Institucion;
  beneficiarios: Beneficiario[];
  descripcion: string[];
}

export interface Contrato {
  id: string;
  fechaPub: string;
  titulo: string;
  urlPdf: string;
  detalles: DetallesDeContrato;
}

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
  codigoPostal = -1,
  nif = '',
  nombre = '',
  coste = -1,
  direccion = '',
  esPyme = false,
  localidad = '',
  lote = -1,
  pais = '',
}: Partial<Beneficiario>): Beneficiario => ({
  codigoPostal,
  nif,
  nombre,
  coste,
  direccion,
  esPyme,
  localidad,
  lote,
  pais,
});

export const construirDetallesDeContrato = ({
  beneficiarios = [],
  descripcion = [],
  institucion = constuirInstitucion({}),
  fecha = new Date(),
}: Partial<DetallesDeContrato>): DetallesDeContrato => ({
  beneficiarios,
  descripcion,
  fecha,
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
