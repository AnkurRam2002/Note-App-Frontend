import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu.component.html'
})
export class MenuComponent {
  role: string | null = null;

  constructor(private auth: AuthService) {
    this.role = this.auth.getCurrentUserRole();
  }
}
