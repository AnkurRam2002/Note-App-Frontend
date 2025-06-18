import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './note-list.component.html'
})
export class NoteListComponent implements OnInit {
  notes: any[] = [];
  filteredNotes: any[] = [];
  paginatedNotes: any[] = [];
  userId: string = '';
  currentUserRole: string = '';

  searchTerm: string = '';

  currentPage: number = 1;
  pageSize: number = 5;

  constructor(private api: ApiService, private auth: AuthService) {}

  ngOnInit() {
    this.userId = this.auth.getCurrentUserId() || '';
    this.currentUserRole = this.auth.getCurrentUserRole() || '';
    console.log('Current User ID:', this.userId);
    this.getNotes();
  }

  getNotes() {
    this.api.getUserNotes().subscribe(data => {
      this.notes = data;
      this.filterNotes(); // initialize filtered notes
    });
  }

  confirmDelete(id: string) {
    if (confirm('Are you sure you want to delete this note?')) {
      this.deleteNote(id);
    }
  }

  deleteNote(id: string) {
    this.api.deleteNote(id).subscribe(() => this.getNotes());
  }

  hasWritePermission(note: any): boolean {
    return note.sharedWith.some((shared: any) =>
      shared.user === this.userId && shared.permission === 'write'
    );
  }

  isOwner(note: any): boolean {
    return note.owner === this.userId;
  }

  // 🔍 Filter notes based on search
  filterNotes() {
    const term = this.searchTerm.toLowerCase();
    this.filteredNotes = this.notes.filter(note =>
      note.title.toLowerCase().includes(term) ||
      note.content.toLowerCase().includes(term) ||
      note.tags.some((tag: string) => tag.toLowerCase().includes(term))
    );
    this.currentPage = 1; // reset to page 1 on search
    this.updatePaginatedNotes();
  }

  // 📑 Calculate notes for current page
  updatePaginatedNotes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedNotes = this.filteredNotes.slice(startIndex, endIndex);
  }

  // ⬅️ Prev page
  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedNotes();
    }
  }

  // ➡️ Next page
  nextPage() {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
      this.updatePaginatedNotes();
    }
  }

  // 📄 Calculate total pages
  totalPages(): number {
    return Math.ceil(this.filteredNotes.length / this.pageSize);
  }

  // Provide paged notes to template
  pagedNotes() {
    return this.paginatedNotes;
  }
}

