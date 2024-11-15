import { Routes } from '@angular/router';
import { loginGuard } from './auth/login.guard';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', canActivate: [loginGuard], loadComponent: () => import('./login/login.component').then(component => component.LoginComponent) },
    { path: 'home', canActivate: [authGuard], loadComponent: () => import('./home/home.component').then(component => component.HomeComponent) },
    { path: 'about-me', loadComponent: () => import('./about/about.component').then(component => component.AboutComponent) }
];
