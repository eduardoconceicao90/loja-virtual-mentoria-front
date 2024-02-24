import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { PessoaJuridica } from '../model/pessoa-juridica';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = environment.urlAPI;

  jwtService: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient,
              private router: Router) { }

  login(usuario: Usuario){
    return this.http.post<String>(this.urlAPI + "/login", usuario).subscribe({
      next: (res) => {
        var resJson = JSON.stringify(res);
        var jwt = JSON.parse(resJson);
        localStorage.setItem('Authorization', jwt.Authorization);
        localStorage.setItem('username', jwt.username);
        localStorage.setItem('empresa', jwt.empresa);
        this.router.navigate(['home']);
      },
      error: (error) => {
        console.log(error);
        alert('Erro login: ' + error.error.text);
      }
    });
  }

  usuarioLogado(){
    var authorization = localStorage.getItem('Authorization');
    if(authorization != null){
      return !this.jwtService.isTokenExpired(authorization);
    }
    return false;
  }

  recuperarSenha(login: String){
    return this.http.post<String>(this.urlAPI + "/recuperarSenha", login).subscribe({
      next: (res) => {
        var resJson = JSON.stringify(res);
        var resposta = JSON.parse(resJson);
        alert(resposta.msg);
      },
      error: (error) => {
        console.log(error);
        alert('Erro ao recuperar senha: ' + error.error.text);
      }
    })
  }

  logout() {
    localStorage.clear();
  }

  codEmpresa(){
    return localStorage.getItem('empresa');
  }

  objetoEmpresa(): PessoaJuridica {
    var pessoaJuridica = new PessoaJuridica();
    pessoaJuridica.id = this.codEmpresa();
    return pessoaJuridica;
  }
}
