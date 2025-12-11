import { Routes } from '@angular/router';
import { Login } from './Copmonets/auth/login/login';
import { User } from './Copmonets/user/user';
import { ProductsComponent } from './Copmonets/products/products';
import { AuthenticationGuard } from './shared/auth/auth-guard';
import { Unauth } from './shared/auth/unauth/unauth';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route

  { path: 'login', component: Login }, // login route

  

  { path: 'products', component: ProductsComponent },

  { path: 'Unauth', component: Unauth },

  { path: 'user', component: User, canActivate: [AuthenticationGuard] },

];
