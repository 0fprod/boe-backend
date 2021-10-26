import { Contrato } from '../models';

export type ContratoDTO = Partial<Omit<Contrato, 'id'>> & { _id?: string };
