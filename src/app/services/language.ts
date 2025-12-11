import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Lang = 'en' | 'ar';

@Injectable({
  providedIn: 'root',
})
export class Language {
  private langSubject: BehaviorSubject<Lang>;
  lang$;

  constructor() {
    // check if localStorage exists (browser environment)
    const savedLang: Lang =
      typeof window !== 'undefined' && window.localStorage
        ? (localStorage.getItem('lang') as Lang) || 'en'
        : 'en';

    this.langSubject = new BehaviorSubject<Lang>(savedLang);
    this.lang$ = this.langSubject.asObservable();
  }

  toggleLanguage() {
    const newLang: Lang = this.langSubject.value === 'en' ? 'ar' : 'en';
    this.langSubject.next(newLang);

    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('lang', newLang);
    }
  }

  get currentLang() {
    return this.langSubject.value;
  }

  get isRtl() {
    return this.langSubject.value === 'ar';
  }
}
