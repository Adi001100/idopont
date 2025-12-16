import { provideRouter, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { ProductComponent } from './component/product/product.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { AuthGuard } from './auth/auth.guard';
import { MeComponent } from './component/me/me.component';
import { ProductCreateComponent } from './component/product-create/product-create.component';
import { ApplicationConfig } from '@angular/core';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptro';
import { CatalogComponent } from './component/catalog/catalog.component';
import { RoleGuard } from './auth/role.guard';
import { FullAdminComponent } from './component/full-admin/full-admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'catalog', component: CatalogComponent },
  { path: 'product', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'FULL_ADMIN'] }, component: ProductComponent },
  { path: 'create', canActivate: [AuthGuard, RoleGuard], data: { roles: ['ADMIN', 'FULL_ADMIN'] }, component: ProductCreateComponent },
  { path: 'full-admin', canActivate: [AuthGuard, RoleGuard], data: { roles: ['FULL_ADMIN'] }, component: FullAdminComponent },
  { path: 'me', canActivate: [AuthGuard], component: MeComponent },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
};
