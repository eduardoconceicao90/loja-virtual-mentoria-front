import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PessoaFisica } from 'src/app/model/pessoa-fisica';
import { LoginService } from 'src/app/security/login.service';
import { PessoaFisicaService } from 'src/app/services/pessoa-fisica.service';

@Component({
  selector: 'app-pessoa-fisica',
  templateUrl: './pessoa-fisica.component.html',
  styleUrls: ['./pessoa-fisica.component.css']
})
export class PessoaFisicaComponent implements OnInit {

  listaPF: PessoaFisica[] = [];
  pessoaFisicaForm: FormGroup;
  pf: PessoaFisica;
  pesquisa: string = '';
  qtdPagina: any = 0;
  arrayNumber: Number[] = [];
  paginaAtual: any = 0;

  constructor(private fb: FormBuilder,
              private pessoaFisicaService: PessoaFisicaService,
              private loginService: LoginService,
              private toastr: ToastrService) {

        this.pf = new PessoaFisica();

        /* Pegar dados do formulário */
        this.pessoaFisicaForm = this.fb.group({
          id:[],
          cpf: [null, Validators.required],
          dataNascimento: [null, Validators.required],
          nome: [null, Validators.required],
          email: [null, Validators.required],
          telefone: [null, Validators.required],
          tipoPessoa: ["", !Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
        });
 }

  ngOnInit(): void {
    this.listarPessoaFisica(this.paginaAtual);
  }

  novo(): void {
    this.pessoaFisicaForm = this.fb.group({
      id:[],
      cpf: [null, Validators.required],
      dataNascimento: [null, Validators.required],
      nome: [null, Validators.required],
      email: [null, Validators.required],
      telefone: [null, Validators.required],
      tipoPessoa: ["", !Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  /* Transformar em objeto */
  pessoaFisicaObjeto(): PessoaFisica {
    return {
      id: this.pessoaFisicaForm.get('id')?.value!,
      cpf: this.pessoaFisicaForm.get('cpf')?.value!,
      dataNascimento: this.pessoaFisicaForm.get('dataNascimento')?.value!,
      nome: this.pessoaFisicaForm.get('nome')?.value!,
      email: this.pessoaFisicaForm.get('email')?.value!,
      telefone: this.pessoaFisicaForm.get('telefone')?.value!,
      tipoPessoa: this.pessoaFisicaForm.get('tipoPessoa')?.value!,
      empresa: this.pessoaFisicaForm.get('empresa')?.value!
    }
  }

  cadastrarPessoaFisica(){
    const pessoaFisica = this.pessoaFisicaObjeto();
    this.pessoaFisicaService.salvarPessoaFisica(pessoaFisica);
    this.novo();
    this.listarPessoaFisica(this.paginaAtual);
  }

  listarPessoaFisica(pagina: number){
    return this.pessoaFisicaService.listarPessoaFisica(pagina).subscribe({
      next: (res) => {
        this.quantidadePaginas();
        this.listaPF = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarPessoaFisica(pessoaFisica: PessoaFisica){
    const pessoaFisicaEditar = this.pessoaFisicaService.buscarPorId(pessoaFisica.id).subscribe({
      next: (res) => {
        this.pf = res;
      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

    this.pessoaFisicaForm = this.fb.group({
      id:[this.pf.id],
      cpf: [this.pf.cpf, Validators.required],
      dataNascimento: [this.pf.dataNascimento, Validators.required],
      nome: [this.pf.nome, Validators.required],
      email: [this.pf.email, Validators.required],
      telefone: [this.pf.telefone, Validators.required],
      tipoPessoa: [this.pf.tipoPessoa, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  excluirPessoaFisica(pessoaFisica: PessoaFisica){
    var confir = confirm('Deseja mesmo excluir?');
    if(confir){
      this.pessoaFisicaService.excluirPessoaFisica(pessoaFisica);
      this.listarPessoaFisica(this.paginaAtual);
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarPessoaFisica(this.paginaAtual);
      return;
    }
    this.pessoaFisicaService.buscarPfPorNomeEEmpresa(this.pesquisa).subscribe({
      next: (res) => {
        this.listaPF = res;
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  buscarPagina(p: Number){
    this.paginaAtual = p;
    this.listarPessoaFisica(this.paginaAtual);
  }

  voltar() {
    if(this.paginaAtual >= 0){
      this.paginaAtual -= 1;
    }
    this.listarPessoaFisica(this.paginaAtual);
  }

  proxima() {
    if(this.paginaAtual < this.qtdPagina){
      this.paginaAtual += 1;
    }
    this.listarPessoaFisica(this.paginaAtual);
  }

  quantidadePaginas(){
    this.pessoaFisicaService.qtdPagina().subscribe({
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
