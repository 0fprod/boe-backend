import { Injectable } from '@nestjs/common';
import { parseStringPromise } from 'xml2js';

@Injectable()
export class Xml2jsonService {
  async parse(xml: string) {
    const { error, sumario } = await parseStringPromise(xml);

    if (error) {
      throw new Error('Fichero inválido');
    }

    return sumario;
  }
}
