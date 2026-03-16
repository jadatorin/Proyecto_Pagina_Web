import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { errorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([tokenInterceptor, errorInterceptor]))
  ]
};
