export type Termino = string[];
export type Descripcion = ListaDeDefinicion | Termino;

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

export interface Documento {
  metadatos: Metadatos;
  texto: ListaDeDefinicion;
}

export interface Anuncio {
  documento: Documento;
}
