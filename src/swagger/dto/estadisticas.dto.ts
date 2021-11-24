import { ApiProperty } from '@nestjs/swagger';
import { Estadistica } from '../../estadisticas/models/estadisticas.model';

export class EstadisticasDto implements Estadistica {
  @ApiProperty({
    example: 'Categoria',
    description: 'Nombre de la categoría',
  })
  etiqueta: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad',
  })
  valor: number;
}
