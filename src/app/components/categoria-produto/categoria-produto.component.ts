import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoriaProduto } from 'src/app/model/categoria-produto';
import { LoginService } from 'src/app/security/login.service';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent implements OnInit {

  categorias: CategoriaProduto[] = [];
  categoriaProdutoForm: FormGroup;
  catProduto: CategoriaProduto;
  pesquisa: string = '';
  qtdPagina: any = 0;
  arrayNumber: Number[] = [];
  paginaAtual: any = 0;

  constructor(private fb: FormBuilder,
              private categoriaProdutoService: CategoriaProdutoService,
              private loginService: LoginService,
              private toastr: ToastrService) {

        this.catProduto = new CategoriaProduto();

        /* Pegar dados do formulário */
        this.categoriaProdutoForm = this.fb.group({
          id:[],
          nomeDesc: [null, Validators.required],
          empresa: [this.loginService.objetoEmpresa(), Validators.required]
        });
 }

  ngOnInit(): void {
    this.listarCategoriaProduto(this.paginaAtual);
  }

  novo(): void {
    this.categoriaProdutoForm = this.fb.group({
      id:[],
      nomeDesc: [null, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  /* Transformar em objeto */
  categoriaProdutoObjeto(): CategoriaProduto {
    return {
      id: this.categoriaProdutoForm.get('id')?.value!,
      nomeDesc: this.categoriaProdutoForm.get('nomeDesc')?.value!,
      empresa: this.categoriaProdutoForm.get('empresa')?.value!
    }
  }

  cadastrarProdutoCategoria(){
    const categoria = this.categoriaProdutoObjeto();
    this.categoriaProdutoService.salvarCategoriaProduto(categoria);
    this.novo();
    this.listarCategoriaProduto(this.paginaAtual);
  }

  listarCategoriaProduto(pagina: number){
    return this.categoriaProdutoService.listarCategoriaProduto(pagina).subscribe({
      next: (res) => {
        this.quantidadePaginas();
        this.categorias = res;
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editarCategoriaProduto(categoriaProduto: CategoriaProduto){
    const categoriaProdutoEditar = this.categoriaProdutoService.buscarPorId(categoriaProduto.id).subscribe({
      next: (res) => {
        this.catProduto = res;
      },
      error: (error) => {
        this.toastr.error(error)
      }
    });

    this.categoriaProdutoForm = this.fb.group({
      id:[this.catProduto.id],
      nomeDesc: [categoriaProduto.nomeDesc, Validators.required],
      empresa: [this.loginService.objetoEmpresa(), Validators.required]
    });
  }

  excluirCategoriaProduto(categoriaProduto: CategoriaProduto){
    var confir = confirm('Deseja mesmo excluir?');
    if(confir){
      this.categoriaProdutoService.excluirCategoriaProduto(categoriaProduto);
      this.listarCategoriaProduto(this.paginaAtual);
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarCategoriaProduto(this.paginaAtual);
      return;
    }
    this.categoriaProdutoService.buscarPorDescEEmpresaCategoria(this.pesquisa).subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (error) => {
        this.toastr.error(error);
      }
    })
  }

  buscarPagina(p: Number){
    this.paginaAtual = p;
    this.listarCategoriaProduto(this.paginaAtual);
  }

  voltar() {
    if(this.paginaAtual >= 0){
      this.paginaAtual -= 1;
    }
    this.listarCategoriaProduto(this.paginaAtual);
  }

  proxima() {
    if(this.paginaAtual < this.qtdPagina){
      this.paginaAtual += 1;
    }
    this.listarCategoriaProduto(this.paginaAtual);
  }

  quantidadePaginas(){
    this.categoriaProdutoService.qtdPagina().subscribe({
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
