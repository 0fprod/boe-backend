import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Contrato } from '../models';

export type ContratoDoc = Document & Omit<Contrato, 'id'>;

@Schema()
class Institucion {
  @Prop()
  nombre: string;

  @Prop()
  nif: string;

  @Prop()
  telefono: string;

  @Prop()
  email: string;

  @Prop()
  web: string;

  @Prop()
  tipoActividad: string;

  @Prop()
  actividad: string;
}

@Schema()
class Beneficiario {
  @Prop()
  nombre: string;

  @Prop()
  nif: string;

  @Prop()
  esPyme: boolean;

  @Prop()
  lote: string;

  @Prop()
  coste: number;

  @Prop()
  descripcion: string;
}

@Schema()
class DetallesDeContrato {
  @Prop({
    type: Institucion,
  })
  institucion: Institucion;

  @Prop([
    {
      type: Beneficiario,
    },
  ])
  beneficiarios: Beneficiario[];

  @Prop()
  descripcion: string;
}

@Schema({ collection: 'contratos' })
export class ContratoEntity {
  @Prop()
  id: string;

  @Prop()
  fechaPub: string;

  @Prop()
  titulo: string;

  @Prop()
  urlPdf: string;

  @Prop({
    type: DetallesDeContrato,
  })
  detalles: DetallesDeContrato;
}

export const ContratoSchema = SchemaFactory.createForClass(ContratoEntity);
