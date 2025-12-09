import { User as UserService } from './../../services/user';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Console } from 'console';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  
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
  }

  deleteUser(id: any) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isloading.set(true);
      this.userService.deleteUser(id).subscribe(
        (res: any) => {
          const updatedUsers = this.users().filter((user) => user.id !== id);
          this.users.set(updatedUsers);
          this.isloading.set(false);
          console.log('Deleted user response:', res);
        },
        (error) => {
          console.error('Error deleting user:', error);
          this.isloading.set(false);
        }
      );
    }
  }
  //edit user
  editUser(id: number, userData: any) {
    this.isloading.set(true);
    this.userService.editUser(id, userData).subscribe(
      (res: any) => {
        console.log('Edited user response:', res);
        this.loadUsers(); 
        this.isloading.set(false);
      },
      (error) => {
        console.error('Error editing user:', error);
        this.isloading.set(false);
      }
    );
  }
  //add user
  addUser(userData: any) {
    this.isloading.set(true);
    this.userService.addUser(userData).subscribe(
      (res: any) => {
        console.log('Added user response:', res);
        this.loadUsers(); 
        this.isloading.set(false);
      },
      (error) => {
        console.error('Error adding user:', error);
        this.isloading.set(false);
      }
    );  
  }
}
