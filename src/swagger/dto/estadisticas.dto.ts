import { ApiProperty } from '@nestjs/swagger';
import { EstadisticasBeneficiarios } from '../../estadisticas/models/estadisticas.model';

export class EstadisticasBeneficiario implements EstadisticasBeneficiarios {
  @ApiProperty({
    example: 'Ferrovial',
    description: 'Nombre de la empresa',
  })
  nombre: string;

  @ApiProperty({
    example: 2,
    description: 'Numero de contratos que se ha llevado',
  })
  numContratos: number;
}
