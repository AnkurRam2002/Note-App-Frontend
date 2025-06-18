import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  imports: [CommonModule, FormsModule],
  standalone: true,
})
export class UsersComponent implements OnInit {
  users: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error fetching users', err),
    });
  }
}
