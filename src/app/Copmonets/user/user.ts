import { User as UserService } from './../../services/user';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Console } from 'console';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  users = signal<any[]>([]);
  isloading = signal<boolean>(false); //loading state
  userName: any;
  userEmail: any;
  modelOpen = signal(false);
  editingUser = signal(false);
  Userid: any = null;
  userForm!: FormGroup;
  constructor(private userService: UserService, private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    this.loadUsers();
    this.userForm = this.formBuilder.group({
      email: [''],
      username: [''],
      password: [''],
    });
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
  //delete user
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
  //open modal
  openModal(user?: any) {
    this.modelOpen.set(true);
    if (user) {
      this.editingUser.set(true);
      this.Userid = user.id;
      this.userForm.setValue({
        email: user.email || '',
        username: user.username || '',
        password: user.password || '',
      });
    } else {
      this.editingUser.set(false);
      this.Userid = null;
      this.userForm.reset();
    }
  }
  //close modal
  closeModal(user?: any) {
    this.modelOpen.set(false);
  }
  //save user
  saveUser() {
    const formValue = this.userForm.value;
    const payload = {
      id: this.Userid,
      email: formValue.email,
      username: formValue.username,
      password: formValue.password,
    };
    console.log('Payload:', payload);
    if (this.editingUser()) {
      this.userService.editUser(this.Userid, payload).subscribe(
        (res: any) => {
          this.users.update((currentUsers) => {
            const index = currentUsers.findIndex((u) => u.id === this.Userid);
            if (index !== -1) {
              currentUsers[index] = res;
            }
            return currentUsers;
          });
          this.closeModal();
        },
        (error) => {
          console.error('Error editing user:', error);
        }
      );
    } // ===============================
    // CREATE USER (Add Mode)
    // ===============================
    else {
      this.userService.addUser(payload).subscribe(
        (createdUser: any) => {
          // Add new user to the list
          this.users.update((currentUsers) => [
            ...currentUsers,
            {
              id: createdUser.id || 0,
              username: formValue.username,
              email: formValue.email,
              password: formValue.password,
            },
          ]);

          this.closeModal();
        },
        (err: any) => {
          console.error('Create failed:', err);
          alert(err.error?.message || 'Failed to create user');
        }
      );
    }
  }
}
