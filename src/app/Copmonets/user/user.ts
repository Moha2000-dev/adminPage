import { User as UserService } from './../../services/user';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  users = signal<any[]>([]);
  isloading = signal<boolean>(false);//loading state
userName: any;
userEmail: any;
  constructor(private userService: UserService) {}

  //lodauser
  loadUsers() {
    this.isloading.set(true);
    this.userService.getUsers().subscribe(
      (res: any) => {
        this.users.set(res);
        this.isloading.set(false);
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isloading.set(false);
      }
    );    

}}
