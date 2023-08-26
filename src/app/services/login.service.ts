import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient) { }

  logar(usuario: Usuario){
    return this.http.post<String>(this.urlAPI + "/login", usuario).subscribe({
      next: (res) => {
        var resJson = JSON.stringify(res);
        var jwt = JSON.parse(resJson);
        localStorage.setItem('Authorization', jwt.Authorization);
      },
      error: (error) => {
        console.log(error);
        alert('Erro login: ' + error.error.text);
      }
    });
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
}
