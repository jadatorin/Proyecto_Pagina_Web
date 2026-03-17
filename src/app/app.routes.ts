import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { publicGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/pages/login/login-page').then((m) => m.LoginPage),
    canActivate: [publicGuard]
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/pages/home-page/home-page').then((m) => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/pages/about-page/about-page').then((m) => m.AboutPage),
    canActivate: [authGuard]
  },
  {
    path: 'services',
    loadComponent: () =>
      import('./features/services/pages/services-page/services-page').then((m) => m.ServicesPage),
    canActivate: [authGuard]
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('./features/contact/pages/contact-page/contact-page').then((m) => m.ContactPage),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];
