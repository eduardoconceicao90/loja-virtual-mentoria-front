import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './security/guard/auth.guard';
import { CategoriaProdutoComponent } from './components/categoria-produto/categoria-produto.component';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'', component: AppComponent },
  { path:'home', component: HomeComponent, canActivate: [authGuard], data: { role:['ROLE_USER', 'ROLE_ADMIN'] } },
  { path:'categoria-produto', component: CategoriaProdutoComponent, canActivate: [authGuard], data: { role:['ROLE_ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
