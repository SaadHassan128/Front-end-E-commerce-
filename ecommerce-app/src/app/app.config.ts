import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAnimations(),
    importProvidersFrom(NgbModule),
    provideClientHydration(),
    {
      provide: 'THEME_CONFIG',
      useValue: {
        storage: 'localStorage',
        storageKey: 'theme',
        defaultTheme: 'light',
      },
    },
  ],
};
