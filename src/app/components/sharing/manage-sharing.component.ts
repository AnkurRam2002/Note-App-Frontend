import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-share-management',
  imports: [CommonModule, FormsModule],
  templateUrl: './manage-sharing.component.html'
})
export class ShareManagementComponent implements OnInit {
  noteId: string = '';
  note: any;
  sharedUsers: any[] = [];
  currentUserId: string = '';

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id') || '';
    this.currentUserId = localStorage.getItem('userId') || '';

    this.api.getNode(this.noteId).subscribe({
      next: (data) => {
        this.note = data;
        this.loadSharedUsers();
      },
      error: (err) => console.error(err)
    });
  }

  loadSharedUsers() {
  this.api.getSharedUsers(this.noteId).subscribe({
    next: (response: any[]) => {
      this.sharedUsers = response.map(user => ({
        ...user,
        updatedPermission: user.permission // Initialize editable permission field
      }));
    },
    error: (err) => console.error(err)
  });
}


  revokeAccess(userId: string) {
    this.api.revokeShare(this.noteId, userId).subscribe({
      next: () => this.loadSharedUsers(),
      error: (err) => console.error(err)
    });
  }

  updatePermission(userId: string, newPermission: string) {
  this.api.updateSharePermission(this.noteId, userId, newPermission).subscribe({
    next: () => {
      // Optionally show a toast or refresh list if needed
      console.log('Permission updated.');
    },
    error: (err) => console.error(err)
  });
}

}

