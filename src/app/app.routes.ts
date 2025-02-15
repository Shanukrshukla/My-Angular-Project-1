// app.routes.ts
import { Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'add', component: AddUserComponent },
  { path: 'edit/:id', component: AddUserComponent } // reusing the add component for editing
];
