import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { MeComponent } from './component/me/me.component';
import { ProductCreateComponent } from './component/product-create/product-create.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', canActivate: [AuthGuard], component: ProductComponent },
  { path: 'create', canActivate: [AuthGuard], component: ProductCreateComponent },
  { path: 'me', canActivate: [AuthGuard], component: MeComponent },
  { path: 'product', loadComponent: () => import('./component/product/product.component').then(m => m.ProductComponent) }

];

export const appConfig = {
  providers: [provideRouter(routes)],
};
