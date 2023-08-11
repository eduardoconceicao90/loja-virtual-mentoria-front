import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private urlAPI = environment.urlAPI + "/login";

  constructor(private http: HttpClient) { }

  logar(usuario: Usuario){
    return this.http.post<String>(this.urlAPI, usuario).subscribe({
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
}
