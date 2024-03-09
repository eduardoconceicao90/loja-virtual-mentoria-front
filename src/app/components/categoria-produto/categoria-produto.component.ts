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
    this.listarCategoriaProduto();
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
    this.listarCategoriaProduto();
  }

  listarCategoriaProduto(){
    return this.categoriaProdutoService.listarCategoriaProduto().subscribe({
      next: (res) => {
        this.categorias = res;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.text);
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
      this.listarCategoriaProduto();
    }
  }

  setPesquisa(valor: string){
    this.pesquisa = valor;
  }

  pesquisar(){
    if(this.pesquisa.length <= 0){
      this.listarCategoriaProduto();
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
}
