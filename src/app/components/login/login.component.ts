import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  email = '';
  password = '';
  mensajeError = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const credenciales = { email: this.email, password: this.password };
    this.authService.login(credenciales).subscribe({
      next: (usuario) => {
        if (usuario.rol === 'admin') {
          this.router.navigate(['/index_administrador']);
        } else {
          this.router.navigate(['/index_usuario']);
        }
      },
      error: (err) => {
        this.mensajeError = 'Usuario o contraseña incorrectos';
      }
    });
  }
}