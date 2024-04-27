import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Endereco } from 'src/app/model/endereco';
import { PessoaJuridica } from 'src/app/model/pessoa-juridica';
import { LoginService } from 'src/app/security/login.service';
import { PessoaJuridicaService } from 'src/app/services/pessoa-juridica.service';


@Component({
  selector: 'app-pessoa-juridica',
  templateUrl: './pessoa-juridica.component.html',
  styleUrls: ['./pessoa-juridica.component.css']
})
export class PessoaJuridicaComponent implements OnInit {

  listaPJ: PessoaJuridica[] = [];
  enderecos: Endereco[] = [];
  pessoaJuridicaForm: FormGroup;
  enderecoForm: FormGroup;
  pj: PessoaJuridica;
  pesquisa: string = '';
  qtdPagina: any = 0;
  arrayNumber: Number[] = [];
  paginaAtual: any = 0;

  constructor(private fb: FormBuilder,
              private pessoaJuridicaService: PessoaJuridicaService,
              private loginService: LoginService,
              private toastr: ToastrService) {

        this.pj = new PessoaJuridica();

        /* Pegar dados do formulário */
        this.pessoaJuridicaForm = this.fb.group({
          id:[],
          cnpj: [null, Validators.required],
          insEstadual: [null, Validators.required],
          insMunicipal: [null, Validators.required],
          nomeFantasia: [null, Validators.required],
          razaoSocial: [null, Validators.required],
          categoria: ["", Validators.required],
          nome: [null, Validators.required],
          email: [null, Validators.required],
          telefone: [null, Validators.required],
          tipoPessoa: ["", !Validators.required],
          enderecos: [this.enderecos, !Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
        });

        this.enderecoForm = this.fb.group({
          id:[],
          ruaLogra: [null, Validators.required],
          numero: [null, Validators.required],
          complemento: [null, Validators.required],
          bairro: [null, Validators.required],
          cidade: [null, Validators.required],
          uf: [null, Validators.required],
          cep: [null, Validators.required],
          pais: [null, Validators.required],
          tipoEndereco: ["", Validators.required]
        });
 }

  ngOnInit(): void {
    this.listarPessoaJuridica(this.paginaAtual);
  }

  novo(): void {
    this.enderecos = [];
    this.pessoaJuridicaForm = this.fb.group({
      id:[],
      cnpj: [null, Validators.required],
      insEstadual: [null, Validators.required],
      insMunicipal: [null, Validators.required],
      nomeFantasia: [null, Validators.required],
      razaoSocial: [null, Validators.required],
      categoria: ["", Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      tipoPessoa: ["", !Validators.required],
      enderecos: [this.enderecos, !Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  /* Transformar em objeto */
  pessoaJuridicaObjeto(): PessoaJuridica {
    return {
      id: this.pessoaJuridicaForm.get('id')?.value!,
      cnpj: this.pessoaJuridicaForm.get('cnpj')?.value!,
      insEstadual: this.pessoaJuridicaForm.get('insEstadual')?.value!,
      insMunicipal: this.pessoaJuridicaForm.get('insMunicipal')?.value!,
      nomeFantasia: this.pessoaJuridicaForm.get('nomeFantasia')?.value!,
      razaoSocial: this.pessoaJuridicaForm.get('razaoSocial')?.value!,
      categoria: this.pessoaJuridicaForm.get('categoria')?.value!,
      nome: this.pessoaJuridicaForm.get('nome')?.value!,
      email: this.pessoaJuridicaForm.get('email')?.value!,
      telefone: this.pessoaJuridicaForm.get('telefone')?.value!,
      tipoPessoa: this.pessoaJuridicaForm.get('tipoPessoa')?.value!,
      enderecos: this.enderecos,
      empresa: this.pessoaJuridicaForm.get('empresa')?.value!
    }
  }

  cadastrarPessoaJuridica(){
    const pessoaJuridica = this.pessoaJuridicaObjeto();
    this.pessoaJuridicaService.salvarPessoaJuridica(pessoaJuridica);
    this.novo();
    this.listarPessoaJuridica(this.paginaAtual);
  }

  listarPessoaJuridica(pagina: number){
    return this.pessoaJuridicaService.listarPessoaJuridica(pagina).subscribe({
      next: (res) => {
        this.quantidadePaginas();
        this.listaPJ = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarPessoaJuridica(pessoaJuridica: PessoaJuridica){
    const pessoaJuridicaEditar = this.pessoaJuridicaService.buscarPorId(pessoaJuridica.id).subscribe({
      next: (res) => {
        this.pj = res;
      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

    this.enderecos = this.pj.enderecos != undefined ? this.pj.enderecos : new Array<Endereco>();

    this.pessoaJuridicaForm = this.fb.group({
      id:[this.pj.id],
      cnpj: [this.pj.cnpj, Validators.required],
      insEstadual: [this.pj.insEstadual, Validators.required],
      insMunicipal: [this.pj.insMunicipal, Validators.required],
      nomeFantasia: [this.pj.nomeFantasia, Validators.required],
      razaoSocial: [this.pj.razaoSocial, Validators.required],
      categoria: [this.pj.categoria, Validators.required],
      nome: [this.pj.nome, Validators.required],
      email: [this.pj.email, Validators.required],
      telefone: [this.pj.telefone, Validators.required],
      tipoPessoa: [this.pj.tipoPessoa, Validators.required],
      enderecos: [this.pj.enderecos, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  excluirPessoaJuridica(pessoaJuridica: PessoaJuridica){
    var confir = confirm('Deseja mesmo excluir?');
    if(confir){
      this.pessoaJuridicaService.excluirPessoaJuridica(pessoaJuridica);
      this.listarPessoaJuridica(this.paginaAtual);
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarPessoaJuridica(this.paginaAtual);
      return;
    }
    this.pessoaJuridicaService.buscarPjPorNomeFantasiaEEmpresa(this.pesquisa).subscribe({
      next: (res) => {
        this.listaPJ = res;
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  buscarPagina(p: Number){
    this.paginaAtual = p;
    this.listarPessoaJuridica(this.paginaAtual);
  }

  voltar() {
    if(this.paginaAtual >= 0){
      this.paginaAtual -= 1;
    }
    this.listarPessoaJuridica(this.paginaAtual);
  }

  proxima() {
    if(this.paginaAtual < this.qtdPagina){
      this.paginaAtual += 1;
    }
    this.listarPessoaJuridica(this.paginaAtual);
  }

  quantidadePaginas(){
    this.pessoaJuridicaService.qtdPagina().subscribe({
      next: (res) => {
        this.qtdPagina = res;
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x, i) => i);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
