import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Navebar } from "./shared/navebar/navebar";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navebar, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  standalone: true


})
export class App {
  protected readonly title = signal('adminPage');
  constructor(public route:Router) {
  }



}
