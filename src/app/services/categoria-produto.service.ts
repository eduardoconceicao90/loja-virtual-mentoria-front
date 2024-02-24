import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoriaProduto } from '../model/categoria-produto';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router) { }

  salvarCategoriaProduto(categoriaProduto: CategoriaProduto){
    return this.http.post<CategoriaProduto>(this.urlAPI + "/salvarCategoria", categoriaProduto).subscribe({
        next: (res) => {

        },
        error: (error) => {
          console.log(error);
          alert('Erro login: ' + error.error.text);
        }
    });
  }
}
