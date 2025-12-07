import { routes } from './../../app.routes';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navebar',
  imports: [RouterModule],
  templateUrl: './navebar.html',
  styleUrl: './navebar.css',
})
export class Navebar {
  //constructor() {} for the logout method
  constructor(public route: Router) {}
  //logout method
  logout() {
    // Implement logout logic here
    this.route.navigate(['/login']);
  }
}
