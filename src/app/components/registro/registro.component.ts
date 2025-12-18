import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.css'
})
export class RegistroComponent {
  nombre = '';
  email = '';
  password = '';
  rol = 'usuario';
  mensaje = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegistro() {
    const nuevoUsuario = {
      nombre: this.nombre,
      email: this.email,
      password: this.password,
      rol: this.rol
    };

    this.authService.registrar(nuevoUsuario).subscribe({
      next: (res) => {
        this.mensaje = '¡Usuario creado! Redirigiendo...';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err) => {
        this.mensaje = 'Error al registrar.';
      }
    });
  }
}