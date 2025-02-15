import { Component, OnInit } from '@angular/core';
import { UserService } from './userservice.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone:true,
  imports:[CommonModule,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // you can add custom styling here
})
export class AppComponent implements OnInit {
  users: any[] = [];
  

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers().subscribe((data: any[]) => this.users = data);
  }

  editUser(id: number) {
    this.router.navigate(['/edit', id]);
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => this.loadUsers());
  }
}
