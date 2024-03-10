import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../security/login.service';
import { MarcaProduto } from '../model/marca-produto';

@Injectable({
  providedIn: 'root'
})
export class MarcaProdutoService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  salvarMarcaProduto(marcaProduto: MarcaProduto){
    return this.http.post<MarcaProduto>(this.urlAPI + "/salvarMarca", marcaProduto).subscribe({
        next: (res) => {
          var resposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(resposta);

          if(jsonResposta.error == undefined){
            this.toastr.success('Marca salva com sucesso!');
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

  listarMarcaProduto(pagina: number){
    console.log("idEmpresa: " + this.loginService.codEmpresa());
    return this.http.get<MarcaProduto[]>(this.urlAPI + "/listaPorPageMarcaProduto/" + this.loginService.codEmpresa() + '/' + pagina);
  }

  buscarPorId(id: number){
    return this.http.get<MarcaProduto>(this.urlAPI + "/obterMarca/" + id);
  }

  excluirMarcaProduto(marcaProduto: MarcaProduto){
    return this.http.post<MarcaProduto>(this.urlAPI + "/deleteMarca", marcaProduto).subscribe({
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

  buscarPorDescEEmpresaMarca(valor: string){
    return this.http.get<MarcaProduto[]>(this.urlAPI + "/buscarPorDescEEmpresaMarca/" + valor + "/" + this.loginService.codEmpresa());
  }

  qtdPagina(){
    return this.http.get<any>(this.urlAPI + "/qtdPaginaMarcaProduto/" + this.loginService.codEmpresa());
  }
}
