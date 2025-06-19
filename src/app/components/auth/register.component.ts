import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.validateEmail(this.email)) {
    alert('Please enter a valid email address.');
    return;
  }
   if (!this.validatePassword(this.password)) {
    alert('Password must be at least 5 characters long.');
    return;
  }
    this.auth.register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: err => alert('Registration failed')
    });
  }

  validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

validatePassword(password: string): boolean {
  const passwordRegex = /^.{5,}$/;
  return passwordRegex.test(password);
}

}
