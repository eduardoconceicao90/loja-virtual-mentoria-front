import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  nomeEmpresa: any;

  constructor(private fb: FormBuilder,
              private categoriaProdutoService: CategoriaProdutoService,
              private loginService: LoginService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.listarCategoriaProduto();
  }

  /* Pegar dados do formulário */
  categoriaProdutoForm = this.fb.group({
    id:[],
    nomeDesc: [null, Validators.required],
    empresa: [this.loginService.objetoEmpresa(), Validators.required]
  });

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
    this.listarCategoriaProduto();
  }

  listarCategoriaProduto(){
    return this.categoriaProdutoService.listarCategoriaProduto().subscribe({
      next: (res) => {
        console.log(res)
        this.categorias = res;
      },
      error: (error) => {
        console.log(error);
        this.toastr.error(error.error.text);
      }
    })
  }

}
