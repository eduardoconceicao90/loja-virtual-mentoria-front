import { PessoaJuridica } from "./pessoa-juridica";

export class Pessoa {
  id?: any;
  nome?: string;
  email?: string;
  telefone?: string;
  tipoPessoa?: string;
  empresa?: PessoaJuridica;
}
