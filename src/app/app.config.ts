import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { routes } from './app.routes';

import { HttpClient, provideHttpClient } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// ✅ use public/i18n
export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  // files: public/i18n/en.json, public/i18n/ar.json
  // URL   : /i18n/en.json,    /i18n/ar.json
  return new TranslateHttpLoader(http, '/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(),

    ...TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!,
  ],
};
