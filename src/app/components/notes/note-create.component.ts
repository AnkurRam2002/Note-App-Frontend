import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-create',
  standalone: true,
  imports: [CommonModule, FormsModule, QuillModule],
  templateUrl: './note-create.component.html'
})
export class NoteCreateComponent {
  title = '';
  content = '';
  tags = '';

  toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    [{ 'color': [] }, { 'background': [] }],
    ['clean']
  ];

  constructor(private api: ApiService, private router: Router) {}

  saveNote() {
    const tagsArray = this.tags.split(',').map(tag => tag.trim());
    this.api.createNote({ title: this.title, content: this.content, tags: tagsArray })
      .subscribe(() => this.router.navigate(['/menu/notes']));
  }
}
