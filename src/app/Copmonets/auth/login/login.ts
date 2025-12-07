import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./Login.css']
})
export class Login implements OnInit {
  usernames: string = '';
  passwords: string = '';
  isloading: boolean = false;
  errormsg: string = '';
showPassword: any;

  constructor(private auth: Auth, private router: Router) {}

  ngOnInit(): void {}

  submit(): void {
    this.isloading = true;
    const data = { username: this.usernames, password: this.passwords };
    this.auth.login(data).subscribe(
      (res) => {
        console.log(res);
        this.isloading = false;
        this.router.navigate(['/user']);
      },
        (err) => {
        console.log(err);
        this.isloading = false;
        this.errormsg = 'Invalid username or password';
      }
    );
  }
}