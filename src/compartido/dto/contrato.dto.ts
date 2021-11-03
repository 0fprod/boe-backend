import { ApiProperty } from '@nestjs/swagger';
import { Beneficiario, Contrato, DetallesDeContrato, Institucion } from '../models';

class InstitucionDto implements Institucion {
  @ApiProperty({
    example: 'Sección de Asuntos Económicos de la Jefatura Sistemas de Información, Telecomunicaciones y Asistencia Técnica.',
    description: 'Nombre de la entidad adjudicadora',
  })
  nombre: string;
  @ApiProperty({ example: 'S2830275J', description: 'NIF de la entidad adjudicadora' })
  nif: string;
  @ApiProperty({ example: '917803435', description: 'Teléfono' })
  telefono: string;
  @ApiProperty({ example: 'saecojcisat@et.mde.es', description: 'Email' })
  email: string;
  @ApiProperty({ example: '-', description: 'Página web' })
  web: string;
  @ApiProperty({ example: 'Administración General del Estado', description: 'Tipo de actividad' })
  tipoActividad: string;
  @ApiProperty({ example: 'Defensa', description: 'Actividad' })
  actividad: string;
}

class BeneficiarioDto implements Beneficiario {
  @ApiProperty({ example: 'Centro de Observación y Teledetección Espacial, S.A.U', description: 'Nombre de la empresa adjudicataria' })
  nombre: string;
  @ApiProperty({ example: 'A47461066', description: 'NIF de la empresa' })
  nif: string;
  @ApiProperty({ example: 'true', description: 'Denota si la empresa es una PYME o no' })
  esPyme: boolean;
  @ApiProperty({ example: 'Lote Num X', description: 'Lote del producto' })
  lote: string;
  @ApiProperty({ example: '117053.72', description: 'Coste del producto' })
  coste: number;
  @ApiProperty({
    example:
      'Servicio para la generación, a partir de ortodoimagen espacial, de información vectorial geoespacial de alta resolucion de zonas urbanas de intertes para la defensa.',
    description: 'Descripción del producto',
  })
  descripcion: string;
}

class DetallesDeContratoDto implements DetallesDeContrato {
  @ApiProperty({ type: InstitucionDto, description: 'Institución' })
  institucion: InstitucionDto;
  @ApiProperty({ type: BeneficiarioDto, description: 'Beneficiarios', isArray: true })
  beneficiarios: BeneficiarioDto[];
  @ApiProperty({
    example:
      'Servicio para la generación, a partir de ortodoimagen espacial, de información vectorial geoespacial de alta resolucion de zonas urbanas de intertes para la defensa.',
    description: 'Descripción del contrato',
  })
  descripcion: string;
}

export class ContratoDTO implements Contrato {
  @ApiProperty({ example: 'BOE-B-2021-44545', description: 'ID del contrato' })
  contratoId: string;
  @ApiProperty({ example: '2021-11-03T00:00:00.000Z', description: 'Fecha de publicación del contrato' })
  fechaPub: string;
  @ApiProperty({
    example:
      'Servicio para la generación, a partir de ortodoimagen espacial, de información vectorial geoespacial de alta resolucion de zonas urbanas de intertes para la defensa.',
    description: 'Título del contrato',
  })
  titulo: string;
  @ApiProperty({ example: '/boe/dias/2021/11/03/pdfs/BOE-B-2021-44545.pdf', description: 'Enlace al PDF oficial' })
  urlPdf: string;
  @ApiProperty({ type: DetallesDeContratoDto, description: 'Detalles' })
  detalles: DetallesDeContratoDto;
}
