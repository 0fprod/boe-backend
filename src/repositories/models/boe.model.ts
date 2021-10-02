export interface Boe {
  idContratos: string[];
}

export const construirBoe = (idContratos: string[] = []): Boe => ({ idContratos });
