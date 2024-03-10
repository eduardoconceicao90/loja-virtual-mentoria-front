import { Acesso } from './../model/acesso';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../security/login.service';

@Injectable({
  providedIn: 'root'
})
export class AcessoService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  salvarAcesso(acesso: Acesso){
    return this.http.post<Acesso>(this.urlAPI + "/salvarAcesso", acesso).subscribe({
        next: (res) => {
          var resposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(resposta);

          if(jsonResposta.error == undefined){
            this.toastr.success('Acesso salvo com sucesso!');
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

  listarAcesso(pagina: number){
    console.log("idEmpresa: " + this.loginService.codEmpresa());
    return this.http.get<Acesso[]>(this.urlAPI + "/listaPorPageAcesso/" + this.loginService.codEmpresa() + '/' + pagina);
  }

  buscarPorId(id: number){
    return this.http.get<Acesso>(this.urlAPI + "/obterAcesso/" + id);
  }

  excluirAcesso(acesso: Acesso){
    return this.http.post<Acesso>(this.urlAPI + "/deleteAcesso", acesso).subscribe({
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

  buscarPorDescEEmpresaAcesso(valor: string){
    return this.http.get<Acesso[]>(this.urlAPI + "/buscarPorDescEEmpresaAcesso/" + valor + "/" + this.loginService.codEmpresa());
  }

  qtdPagina(){
    return this.http.get<any>(this.urlAPI + "/qtdPaginaAcesso/" + this.loginService.codEmpresa());
  }
}
