interface UrlPdf {
  _: string;
}

export interface Item {
  id: string;
  titulo: string;
  urlpdf: UrlPdf;
}

export interface Departamento {
  nombre: string;
  item: Item[];
}

export interface Seccion {
  num: string;
  nombre: string;
  departamento: Departamento[];
}

export interface Diario {
  nbo: string;
  sumario_nbo: string;
  seccion: Seccion[];
}

export interface Meta {
  pub: string;
  anno: string;
  fecha: string;
  fechainv: string;
  fechaant: string;
  fechaantant: string;
  fechasig: string;
  fechapub: string;
  pubdate: string;
}

export interface Sumario {
  diario: Diario;
  meta: Meta;
}
