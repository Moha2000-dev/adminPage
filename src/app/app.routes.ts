import { Routes } from '@angular/router';
import { Login } from './Copmonets/auth/login/login';
import { User } from './Copmonets/user/user';
import { ProductsComponent } from './Copmonets/products/products';
import { Unauth } from './shared/auth/unauth/unauth';
import { AuthenticationGuard } from './shared/auth/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default route

  { path: 'login', component: Login }, // login route

  { path: 'user', component: User }, // user route

  { path: 'products', component: ProductsComponent },

  { path: 'unauthorized', component: Unauth },
  { path: 'products', component: ProductsComponent, canActivate: [AuthenticationGuard] },

];
