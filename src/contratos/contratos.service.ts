import { Injectable } from '@nestjs/common';

@Injectable()
export class ContratosService {
  // Leer de mongo
  getHello(): string {
    return 'Hello';
  }
}
