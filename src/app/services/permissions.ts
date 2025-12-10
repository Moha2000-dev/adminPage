import { User } from './user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Permissions {
  private loggedInUserRole: { User: any; role: string } | null = null;
  constructor() {}

  RolesAssiger() {
    const username = sessionStorage.getItem('username_sessions');
    if (username) {
      if (username === 'johnd') {
        this.loggedInUserRole = { User: username, role: 'admin' };
      }
      //editer
      else if (username === 'mor_2314') {
        this.loggedInUserRole = { User: username, role: 'editer' };
      }
      //viewer
      else if (username === 'kevinryan') {
        this.loggedInUserRole = { User: username, role: 'viewer' };
      } else {
        this.loggedInUserRole = { User: username, role: 'user' };
      }

      localStorage.setItem('user_role', this.loggedInUserRole.role);
    }
  }
  hasrole(role: any): boolean {
    const userRole = localStorage.getItem('user_role');
    return userRole === role;
  }

  onLogout() {
    localStorage.clear();
  }
}
