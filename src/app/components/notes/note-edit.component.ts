import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ApiService } from '../../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-note-edit',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './note-edit.component.html'
})
export class NoteEditComponent implements OnInit {
  noteId: string = '';
  title: string = '';
  content: string = '';
  tags: string = '';

  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.noteId = this.route.snapshot.paramMap.get('id') || '';
    this.getNote();
  }

  getNote() {
    this.api.getNoteById(this.noteId).subscribe((note: any) => {
      this.title = note.title;
      this.content = note.content;
      this.tags = note.tags.join(', ');
    });
  }

  updateNote() {
    const tagsArray = this.tags.split(',').map(tag => tag.trim());
    this.api.updateNote(this.noteId, {
      title: this.title,
      content: this.content,
      tags: tagsArray
    }).subscribe(() => this.router.navigate(['/menu/notes']));
  }
}
