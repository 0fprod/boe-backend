export interface Boe {
  idContratos: string[];
}

export const buildBoe = (idContratos: string[] = []): Boe => ({ idContratos });
