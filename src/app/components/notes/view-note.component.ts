import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-view-note',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-note.component.html'
})
export class ViewNoteComponent implements OnInit {
  noteId = '';
  note: any = null;
  userId = '';
  userRole = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id') || '';
    this.userId = this.auth.getCurrentUserId() || '';
    this.userRole = this.auth.getCurrentUserRole() || '';
    console.log('Current User ID:', this.userId);
    console.log('Current User Role:', this.userRole);
    this.loadNote();
  }

  loadNote() {
    this.api.getNoteById(this.noteId).subscribe({
      next: (data) => this.note = data,
      error: (err) => console.error(err)
    });
  }

  confirmDelete(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.deleteNote(id);
    }
  }

  deleteNote(id: string) {
    this.api.deleteNote(id).subscribe(() => this.router.navigate(['/menu/notes']));
  }

  hasWritePermission(note: any): boolean {
    return note.sharedWith.some((shared: any) =>
      shared.user === this.userId && shared.permission === 'write'
    );
  }

  isOwner(note: any): boolean {
    return note.owner._id === this.userId;
  }
}
