import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoriaProduto } from '../model/categoria-produto';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../security/login.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  salvarCategoriaProduto(categoriaProduto: CategoriaProduto){
    return this.http.post<CategoriaProduto>(this.urlAPI + "/salvarCategoria", categoriaProduto).subscribe({
        next: (res) => {
          var resposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(resposta);

          if(jsonResposta.error == undefined){
            this.toastr.success('Categoria salva com sucesso!');
          } else {
            this.toastr.error(jsonResposta.error);
          }

        },
        error: (error) => {
          console.log(error);
          this.toastr.error(error.error.error);
        }
    });
  }

  listarCategoriaProduto(){
    return this.http.get<CategoriaProduto[]>(this.urlAPI + "/listarCategoriaProduto/" + this.loginService.codEmpresa());
  }

  buscarPorId(id: number){
    return this.http.get<CategoriaProduto>(this.urlAPI + "/buscarCategoriaPorId/" + id);
  }

  excluirCategoriaProduto(categoriaProduto: CategoriaProduto){
    return this.http.post<CategoriaProduto>(this.urlAPI + "/deleteCategoria", categoriaProduto).subscribe({
      next: (res) => {
        var resposta = JSON.stringify(res);
        var jsonResposta = JSON.parse(resposta);

        if(jsonResposta.error == undefined){
          this.toastr.success(resposta);
        } else {
          this.toastr.error(jsonResposta.error);
        }

      },
      error: (error) => {
        console.log(error);
          this.toastr.error(error.error.error);
      }
    });
  }

  buscarPorDescEEmpresaCategoria(valor: string){
    return this.http.get<CategoriaProduto[]>(this.urlAPI + "/buscarPorDescEEmpresaCategoria/" + valor + "/" + this.loginService.codEmpresa());
  }
}
