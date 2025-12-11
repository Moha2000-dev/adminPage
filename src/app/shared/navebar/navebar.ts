import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Language } from '../../services/language';
import { TranslateService } from '@ngx-translate/core';
import { Permissions } from '../../services/permissions';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navebar',
  imports: [RouterModule ,CommonModule],
  templateUrl: './navebar.html',
  styleUrl: './navebar.css',
})
export class Navebar {
  //constructor() {} for the logout method
  constructor(
    public route: Router,
    public languageService: Language,
    private translate: TranslateService,
    private premmissions: Permissions
  ) {}

  togglelanguage() {
    this.languageService.toggleLanguage();
    this.translate.use(this.languageService.currentLang);
  }
  ngOnInit(): void {
    this.translate.use(this.languageService.currentLang);
  }

  //logout method
  logout() {
    // Implement logout logic here
    this.route.navigate(['/login']);
    this.premmissions.onLogout();
  }
}
