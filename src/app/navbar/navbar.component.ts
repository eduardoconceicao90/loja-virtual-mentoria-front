import { Component } from '@angular/core';
import { LoginService } from '../security/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private loginService: LoginService,
              private toastr: ToastrService) { }

  logout(){
    this.loginService.logout();
    this.toastr.info('Logout realizado com sucesso!');
  }

}
