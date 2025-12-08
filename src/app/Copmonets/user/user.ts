import { User as UserService } from './../../services/user';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import id from '@angular/common/locales/id';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  editUser(_t22: any) {
    throw new Error('Method not implemented.');
  }
  addUser() {
    throw new Error('Method not implemented.');
  }
  users = signal<any[]>([]);
  isloading = signal<boolean>(false); //loading state
  userName: any;
  userEmail: any;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.loadUsers();
  }
  //lodauser
  loadUsers() {
    this.isloading.set(true);
    this.userService.getUsers().subscribe(
      (res: any) => {
        this.users.set(res);
        this.isloading.set(false);
        console.log('this user ', this.users());
      },
      (error) => {
        console.error('Error fetching users:', error);
        this.isloading.set(false);
      }
    );
    //delete user
  }
  deleteUser(id: number) {
    this.isloading.set(true);
    this.userService.deleteUser(id).subscribe(
      (res: any) => {
        const updatedUsers = this.users().filter((user) => user.id !== id);
        this.users.set(updatedUsers);
        this.isloading.set(false);
      },
      (error) => {
        console.error('Error deleting user:', error);
        this.isloading.set(false);
      }
    );
  }
}
