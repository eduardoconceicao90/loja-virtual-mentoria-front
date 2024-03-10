import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MarcaProduto } from 'src/app/model/marca-produto';
import { LoginService } from 'src/app/security/login.service';
import { MarcaProdutoService } from 'src/app/services/marca-produto.service';

@Component({
  selector: 'app-marca-produto',
  templateUrl: './marca-produto.component.html',
  styleUrls: ['./marca-produto.component.css']
})
export class MarcaProdutoComponent implements OnInit {

  marcas: MarcaProduto[] = [];
  marcaProdutoForm: FormGroup;
  marProduto: MarcaProduto;
  pesquisa: string = '';
  qtdPagina: any = 0;
  arrayNumber: Number[] = [];
  paginaAtual: any = 0;

  constructor(private fb: FormBuilder,
              private marcaProdutoService: MarcaProdutoService,
              private loginService: LoginService,
              private toastr: ToastrService) {

        this.marProduto = new MarcaProduto();

        /* Pegar dados do formulário */
        this.marcaProdutoForm = this.fb.group({
          id:[],
          nomeDesc: [null, Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
        });
 }

  ngOnInit(): void {
    this.marcaProdutoService.qtdPagina().subscribe({
      next: (res) => {
        this.qtdPagina = res;
        this.arrayNumber = Array(this.qtdPagina).fill(0).map((x, i) => i);
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.listarMarcaProduto(this.paginaAtual);
  }

  novo(): void {
    this.marcaProdutoForm = this.fb.group({
      id:[],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  /* Transformar em objeto */
  MarcaProdutoObjeto(): MarcaProduto {
    return {
      id: this.marcaProdutoForm.get('id')?.value!,
      nomeDesc: this.marcaProdutoForm.get('nomeDesc')?.value!,
      empresa: this.marcaProdutoForm.get('empresa')?.value!
    }
  }

  cadastrarProdutoMarca(){
    const marca = this.MarcaProdutoObjeto();
    this.marcaProdutoService.salvarMarcaProduto(marca);
    this.novo();
    this.listarMarcaProduto(this.paginaAtual);
  }

  listarMarcaProduto(pagina: number){
    return this.marcaProdutoService.listarMarcaProduto(pagina).subscribe({
      next: (res) => {
        this.marcas = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarMarcaProduto(marcaProduto: MarcaProduto){
    const MarcaProdutoEditar = this.marcaProdutoService.buscarPorId(marcaProduto.id).subscribe({
      next: (res) => {
        this.marProduto = res;
      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

    this.marcaProdutoForm = this.fb.group({
      id:[this.marProduto.id],
      nomeDesc: [marcaProduto.nomeDesc, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  excluirMarcaProduto(marcaProduto: MarcaProduto){
    var confir = confirm('Deseja mesmo excluir?');
    if(confir){
      this.marcaProdutoService.excluirMarcaProduto(marcaProduto);
      this.listarMarcaProduto(this.paginaAtual);
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarMarcaProduto(this.paginaAtual);
      return;
    }
    this.marcaProdutoService.buscarPorDescEEmpresaMarca(this.pesquisa).subscribe({
      next: (res) => {
        this.marcas = res;
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  buscarPagina(p: Number){
    this.paginaAtual = p;
    this.listarMarcaProduto(this.paginaAtual);
  }

  voltar() {
    if(this.paginaAtual >= 0){
      this.paginaAtual -= 1;
    }
    this.listarMarcaProduto(this.paginaAtual);
  }

  proxima() {
    if(this.paginaAtual < this.qtdPagina){
      this.paginaAtual += 1;
    }
    this.listarMarcaProduto(this.paginaAtual);
  }
}

