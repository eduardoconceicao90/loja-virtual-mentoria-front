import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  console.info(route.data)
  return inject(LoginService).usuarioLogado();
};
