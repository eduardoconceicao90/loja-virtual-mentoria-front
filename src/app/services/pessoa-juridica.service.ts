import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../security/login.service';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class PessoaJuridicaService {
  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private loginService: LoginService) { }

  salvarPessoaJuridica(pessoaJuridica: PessoaJuridica){
    return this.http.post<PessoaJuridica>(this.urlAPI + "/salvarPj", pessoaJuridica).subscribe({
        next: (res) => {
          var resposta = JSON.stringify(res);
          var jsonResposta = JSON.parse(resposta);

          if(jsonResposta.error == undefined){
            this.toastr.success('Pessoa jurídica salva com sucesso!');
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

  listarPessoaJuridica(pagina: number){
    console.log("idEmpresa: " + this.loginService.codEmpresa());
    return this.http.get<PessoaJuridica[]>(this.urlAPI + "/listaPorPagePj/" + this.loginService.codEmpresa() + '/' + pagina);
  }

  buscarPorId(id: number){
    return this.http.get<PessoaJuridica>(this.urlAPI + "/buscarPjPorId/" + id);
  }

  excluirPessoaJuridica(pessoaJuridica: PessoaJuridica){
    return this.http.post<PessoaJuridica>(this.urlAPI + "/deletarPj", pessoaJuridica).subscribe({
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

  buscarPjPorNomeFantasiaEEmpresa(valor: string){
    return this.http.get<PessoaJuridica[]>(this.urlAPI + "/buscarPjPorNomeFantasiaEEmpresa/" + valor + "/" + this.loginService.codEmpresa());
  }

  qtdPagina(){
    return this.http.get<any>(this.urlAPI + "/qtdPaginaPj/" + this.loginService.codEmpresa());
  }
}
