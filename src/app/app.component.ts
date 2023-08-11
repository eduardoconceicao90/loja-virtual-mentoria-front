import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Usuario } from './model/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tituloLogin = 'Login da loja';

  constructor(private fb: FormBuilder){ }

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
}
