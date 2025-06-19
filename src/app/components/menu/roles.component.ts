import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  imports: [CommonModule, FormsModule],
})
export class RolesComponent implements OnInit {
  users: any[] = [];
  roles = ['employee', 'manager', 'admin'];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
  this.api.getUsers().subscribe({
    next: (data) => {
      this.users = data.map(user => ({
        ...user,
        newRole: user.role // pre-fill dropdown with current role
      }));
    },
    error: (err) => console.error(err)
    });
  }

  updateRole(userId: string, newRole: string) {
    this.api.updateUserRole(userId, newRole).subscribe({
      next: () => {
        alert('Role updated!');
        this.loadUsers();
      },
      error: (err) => console.error(err)
    });
  }
}
