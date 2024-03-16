import { Pessoa } from "./pessoa";

export class PessoaJuridica extends Pessoa {
  cnpj?: string;
  insEstadual?: string;
  insMunicipal?: string;
  nomeFantasia?: string;
  razaoSocial?: string;
  categoria?: string;
}
