import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../userservice.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: 'add-user.component.html',
  styleUrls: ['add-user.component.css']
   
})
export class AddUserComponent implements OnInit {
  userForm = inject(FormBuilder).nonNullable.group({
    name: [''],
    email: [''],
    age: [null]
  });
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  isEditMode = false;
  userId: number | null = null;
  successMessage: string | null = null;

  ngOnInit() {
    // Check if there's an ID for edit mode
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.userId = +params['id'];
        this.userService.getUser(this.userId).subscribe(user => {
          this.userForm.patchValue(user);
        });
      }
    });
  }

  onSubmit() {
    if (this.isEditMode && this.userId !== null) {
      this.userService.updateUser(this.userId, this.userForm.value).subscribe(() => {
        this.successMessage = 'User updated successfully';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    } else {
      this.userService.addUser(this.userForm.value).subscribe(() => {
        this.successMessage = 'User added successfully';
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 2000);
      });
    }
  }
}