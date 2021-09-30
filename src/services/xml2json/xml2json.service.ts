import { Injectable } from '@nestjs/common';
import { parseStringPromise, ParserOptions } from 'xml2js';

@Injectable()
export class Xml2jsonService {
  private opciones: ParserOptions;

  constructor() {
    this.opciones = {
      async: true,
      trim: true,
      normalizeTags: true,
      explicitArray: false,
      mergeAttrs: true,
      preserveChildrenOrder: true,
    };
  }

  async parse(xml: string) {
    const { error, sumario } = await parseStringPromise(xml, this.opciones);

    if (error) {
      throw new Error('Fichero inválido');
    }

    return sumario;
  }
}
