import { ApiProperty } from '@nestjs/swagger';
import { Estadistica } from '../../estadisticas/models/estadisticas.model';

export class EstadisticasBeneficiario implements Estadistica {
  @ApiProperty({
    example: 'Ferrovial',
    description: 'Nombre de la empresa',
  })
  etiqueta: string;

  @ApiProperty({
    example: 2,
    description: 'Numero de contratos que se ha llevado',
  })
  valor: number;
}
