import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-share-note',
  imports: [CommonModule, FormsModule],
  templateUrl: './share-note.component.html'
})
export class ShareNoteComponent implements OnInit {
  users: any[] = [];
  noteId!: string;
  selectedUserId = '';
  permission = 'read';

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.params['id'];
    this.api.getUsers().subscribe(data => this.users = data);
  }

  shareNote() {
    this.api.shareNote(this.noteId, this.selectedUserId, this.permission, this.noteId).subscribe(() => {
      this.router.navigate(['/menu/notes']);
    });
  }
}