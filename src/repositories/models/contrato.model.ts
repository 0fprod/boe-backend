export interface Institucion {
  nombre: string;
  nif: string;
  direccion: string;
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
