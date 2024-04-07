import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../security/login.service';
import { PessoaFisica } from '../model/pessoa-fisica';

@Injectable({
  providedIn: 'root'
})
export class PessoaFisicaService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  salvarPessoaFisica(pessoaFisica: PessoaFisica){
    return this.http.post<PessoaFisica>(this.urlAPI + "/salvarPf", pessoaFisica).subscribe({
        next: (res) => {
          var resposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(resposta);

          if(jsonResposta.error == undefined){
            this.toastr.success('Pessoa física salva com sucesso!');
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

  listarPessoaFisica(pagina: number){
    console.log("idEmpresa: " + this.loginService.codEmpresa());
    return this.http.get<PessoaFisica[]>(this.urlAPI + "/listaPorPagePf/" + this.loginService.codEmpresa() + '/' + pagina);
  }

  buscarPorId(id: number){
    return this.http.get<PessoaFisica>(this.urlAPI + "/buscarPfPorId/" + id);
  }

  excluirPessoaFisica(pessoaFisica: PessoaFisica){
    return this.http.post<PessoaFisica>(this.urlAPI + "/deletarPf", pessoaFisica).subscribe({
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

  buscarPfPorNomeEEmpresa(valor: string){
    return this.http.get<PessoaFisica[]>(this.urlAPI + "/buscarPfPorNomeEEmpresa/" + valor + "/" + this.loginService.codEmpresa());
  }

  qtdPagina(){
    return this.http.get<any>(this.urlAPI + "/qtdPaginaPf/" + this.loginService.codEmpresa());
  }
}

