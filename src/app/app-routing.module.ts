import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { authGuard } from './guard/auth.guard';

const routes: Routes = [
  { path:'login', component: LoginComponent },
  { path:'', component: AppComponent },
  { path:'home', component: HomeComponent, canActivate: [authGuard], data: { role:['ROLE_USER', 'ROLE_ADMIN'] } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
