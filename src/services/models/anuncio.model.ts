export type Termino = string;
export type Descripcion = Texto | Termino;

export interface ListaDeDefinicion {
  dd: Descripcion[];
  dt: Termino[];
}

export interface Metadatos {
  identificador: string;
  fecha_pubilcacion: string;
  numero_anuncio: string;
  titulo: string;
  url_pdf: string;
}

export interface Texto {
  dl: ListaDeDefinicion;
}

export interface Documento {
  metadatos: Metadatos;
  texto: Texto;
}

export interface Anuncio {
  documento: Documento;
}
