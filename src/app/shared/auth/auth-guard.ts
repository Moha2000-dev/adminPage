import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Permissions } from '../../services/permissions';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {

  constructor(private router: Router, private permissions: Permissions) {}

  canActivate(): boolean {
    //Get the permission service hasRole function
    if (this.permissions.hasrole('admin')) {
      return true;
    } else if (this.permissions.hasrole('editor')) {
      return true;
    } else if (this.permissions.hasrole('viewer')) {
      return true;
    }

    this.router.navigate(['unauthorized']);
    return false;
  }
}

