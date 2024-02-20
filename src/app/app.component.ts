import { Component } from '@angular/core';
import { LoginService } from './security/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private loginService: LoginService) { }

  usuarioLogado(){
    return this.loginService.usuarioLogado();
  }
}
