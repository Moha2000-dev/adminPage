import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from '@ngx-translate/core';

export function HttploderFactory(http:HttpClient) {
  return new  TranslateHttpLoader(http, './public/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(),

    ...(TranslateModule.forRoot({
      loader: {
        provide: TranslateHttpLoader,
        useFactory: HttploderFactory,
        deps: [HttpClient]
      }
    }).providers!),

  ]
};
