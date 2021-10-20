export type Termino = string;
export type Descripcion = Texto | Termino;

export interface ListaDeDefinicion {
  dd: Descripcion[] | Termino;
  dt: Termino[] | Termino;
}

export interface Metadatos {
  identificador: string;
  fecha_publicacion: string;
  numero_anuncio: string;
  titulo: string;
  url_pdf: string;
}

export interface Texto {
  dl: ListaDeDefinicion;
}

export interface Anuncio {
  metadatos: Metadatos;
  texto: Texto;
}
