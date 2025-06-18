import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  // Get all notes owned by or shared with user
  getUserNotes() {
    return this.http.get<any[]>(`${this.apiUrl}/notes`);
  }

  // Get a single note by ID
  getNoteById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/notes/${id}`);
  }

  // Create a new note
  createNote(note: any) {
    return this.http.post(`${this.apiUrl}/notes`, note);
  }

  // Update note by ID
  updateNote(id: string, note: any) {
    return this.http.put(`${this.apiUrl}/notes/edit/${id}`, note);
  }

  // Delete note by ID
  deleteNote(id: string) {
    return this.http.delete(`${this.apiUrl}/notes/${id}`);
  }

  // Share note with user (read / write)
  shareNote(noteId: string, userId: string, permission: string, id: string) {
    return this.http.post(`${this.apiUrl}/notes/share/${id}`, { noteId, userId, permission });
  }

  // Get analytics data
  getAnalytics() {
    return this.http.get<any>(`${this.apiUrl}/analytics`);
  }

  // Get all users (for sharing)
  getUsers() {
    return this.http.get<any[]>(`${this.apiUrl}/notes/users`);
  }

  getNode(id: string) {
    return this.http.get<any>(`${this.apiUrl}/notes/${id}`);
  }

   // Get users with whom the note is shared
  getSharedUsers(noteId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/notes/${noteId}/shared-users/${noteId}`);
  }

  // Revoke a user's access to a note
  revokeShare(noteId: string, userId: string) {
    return this.http.delete(`${this.apiUrl}/notes/${noteId}/share/${userId}`);
  }
}
