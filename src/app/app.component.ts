import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './model/usuario';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tituloLogin = 'Login da loja';

  constructor(private fb: FormBuilder,
              private loginService: LoginService){ }

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
    console.log('Login -> ' + usuario.login, 'Senha -> ' + usuario.senha);

    this.loginService.logar(usuario);
  }
}
