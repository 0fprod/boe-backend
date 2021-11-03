import { ApiProperty } from '@nestjs/swagger';
import { Boe } from '../models/boe.model';
export class BoeDTO implements Boe {
  @ApiProperty({ example: ['BOE-B-AAAA-XXX1', 'BOE-B-AAAA-XXX2'], description: 'Colección de ID de contratos' })
  idContratos: string[];
}
