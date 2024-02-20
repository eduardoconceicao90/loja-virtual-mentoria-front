import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../login.service';
import { environment } from 'src/environments/environment';

export const authGuard: CanActivateFn = (route, state) => {

  var username = localStorage.getItem('username');
  var roles = route.data;

  var role = JSON.parse(JSON.stringify(roles)).role.toString();
  var authorization = '' + localStorage.getItem('Authorization');

  var request = new XMLHttpRequest();
  request.open("GET", environment.urlAPI + '/possuiAcesso/' + username + '/' + role, false);
  request.setRequestHeader('Authorization', authorization);
  request.send();

  var possuiAcessoRetorno = request.responseText === 'true' || new Boolean(request.responseText) === true;
  var usuarioLogado = inject(LoginService).usuarioLogado();

  if(usuarioLogado){
    return (usuarioLogado && possuiAcessoRetorno);
  } else {
    inject(Router).navigate(['login']);
    return false;
  }
};
