// user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../userservice.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.css']
    
})
export class UserListComponent implements OnInit {

  users: any[] = [];
  successMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => this.users = data);
  }

  navigateToAdd() {
    this.router.navigate(['/add']);
  }

  editUser(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteUser(id: number) {
    if (window.confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.successMessage = 'User deleted successfully';
        this.loadUsers();
        setTimeout(() => this.successMessage = null, 3000); // Clear the message after 3 seconds
      });
    }
  }
}