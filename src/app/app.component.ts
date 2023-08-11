import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
}
