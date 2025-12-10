import { Component, OnInit } from '@angular/core';
import { Auth } from '../../../services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Permissions } from '../../../services/permissions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule , ],
  templateUrl: './login.html',
  styleUrls: ['./Login.css']
})
export class Login implements OnInit {
  usernames: string = '';
  passwords: string = '';
  isloading: boolean = false;
  errormsg: string = '';
showPassword: any;

  constructor(private auth: Auth, private router: Router, private permissions: Permissions) {}

  ngOnInit(): void {}

  submit(): void {
    this.isloading = true;
    console.log(this.usernames, this.passwords);
    const data = { username: this.usernames, password: this.passwords };
    this.auth.login(data).subscribe(
      (res: any) => {
        console.log(res);
        this.isloading = false;
        localStorage.setItem('token', res.token);
        this.router.navigate(['/user']);
        this.permissions.RolesAssiger();
        sessionStorage.setItem('username_sessions', this.usernames);
        console.log('role', localStorage.getItem('user_role'));

      },
        (err: any) => {
        console.log(err);
        this.isloading = false;
        this.errormsg = 'Invalid username or password';
      }
    );
  }
}