import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Acesso } from 'src/app/model/acesso';
import { LoginService } from 'src/app/security/login.service';
import { AcessoService } from 'src/app/services/acesso.service';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  acessos: Acesso[] = [];
  acessoForm: FormGroup;
  ac: Acesso;
  pesquisa: string = '';
  qtdPagina: any = 0;
  arrayNumber: Number[] = [];
  paginaAtual: any = 0;

  constructor(private fb: FormBuilder,
              private acessoService: AcessoService,
              private loginService: LoginService,
              private toastr: ToastrService) {

        this.ac = new Acesso();

        /* Pegar dados do formulário */
        this.acessoForm = this.fb.group({
          id:[],
          descricao: [null, Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
        });
 }

  ngOnInit(): void {
    this.listarAcesso(this.paginaAtual);
  }

  novo(): void {
    this.acessoForm = this.fb.group({
      id:[],
      descricao: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  /* Transformar em objeto */
  acessoObjeto(): Acesso {
    return {
      id: this.acessoForm.get('id')?.value!,
      descricao: this.acessoForm.get('descricao')?.value!,
      empresa: this.acessoForm.get('empresa')?.value!
    }
  }

  cadastrarAcesso(){
    const acesso = this.acessoObjeto();
    this.acessoService.salvarAcesso(acesso);
    this.novo();
    this.listarAcesso(this.paginaAtual);
  }

  listarAcesso(pagina: number){
    return this.acessoService.listarAcesso(pagina).subscribe({
      next: (res) => {
        this.quantidadePaginas();
        this.acessos = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarAcesso(acesso: Acesso){
    const acessoEditar = this.acessoService.buscarPorId(acesso.id).subscribe({
      next: (res) => {
        this.ac = res;
      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

    this.acessoForm = this.fb.group({
      id:[this.ac.id],
      descricao: [this.ac.descricao, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  excluirAcesso(acesso: Acesso){
    var confir = confirm('Deseja mesmo excluir?');
    if(confir){
      this.acessoService.excluirAcesso(acesso);
      this.listarAcesso(this.paginaAtual);
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarAcesso(this.paginaAtual);
      return;
    }
    this.acessoService.buscarPorDescEEmpresaAcesso(this.pesquisa).subscribe({
      next: (res) => {
        this.acessos = res;
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  buscarPagina(p: Number){
    this.paginaAtual = p;
    this.listarAcesso(this.paginaAtual);
  }

  voltar() {
    if(this.paginaAtual >= 0){
      this.paginaAtual -= 1;
    }
    this.listarAcesso(this.paginaAtual);
  }

  proxima() {
    if(this.paginaAtual < this.qtdPagina){
      this.paginaAtual += 1;
    }
    this.listarAcesso(this.paginaAtual);
  }

  quantidadePaginas(){
    this.acessoService.qtdPagina().subscribe({
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
