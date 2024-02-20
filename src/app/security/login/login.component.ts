import { Component } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Usuario } from '../../model/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  tituloLogin = 'Login da loja';

  constructor(private fb: FormBuilder,
              private loginService: LoginService) { }

  /* Pegar dados do formulário */
  loginForm = this.fb.group({
    login: [null, Validators.required],
    senha: [null, Validators.required]
  });

  /* Transformar em objeto */
  loginObjeto(): Usuario {
    return {
      login: this.loginForm.get('login')?.value!,
      senha: this.loginForm.get('senha')?.value!
    }
  }

  fazerLogin(){
    const usuario = this.loginObjeto();
    this.loginService.login(usuario);
  }

  recuperarSenha(){
    const usuario = this.loginObjeto();
    var login = usuario.login;

    if(login == '' || login == null){
      alert('Informe o login para recuperar senha');
    } else {
      this.loginService.recuperarSenha(login);
    }
  }
}
