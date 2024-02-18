import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  var username = localStorage.getItem('username');
  var roles = route.data;
  console.info(username)
  console.info(roles)
  return inject(LoginService).usuarioLogado();
};
