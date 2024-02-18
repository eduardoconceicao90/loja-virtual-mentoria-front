import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor (private loginService: LoginService,
               private router: Router){
  }

  ngOnInit(): void {
    if(this.loginService.usuarioLogado()){
      this.router.navigate(['home']);
    }else{
      this.router.navigate(['login']);
    }
  }
}
