import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoriaProduto } from 'src/app/model/categoria-produto';
import { CategoriaProdutoService } from 'src/app/services/categoria-produto.service';

@Component({
  selector: 'app-categoria-produto',
  templateUrl: './categoria-produto.component.html',
  styleUrls: ['./categoria-produto.component.css']
})
export class CategoriaProdutoComponent {

  constructor(private fb: FormBuilder,
              private categoriaProdutoService: CategoriaProdutoService) { }

  /* Pegar dados do formulário */
  categoriaProdutoForm = this.fb.group({
    id:[],
    nomeDesc: [null, Validators.required]
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
    console.log(categoria)
  }

}
