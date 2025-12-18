import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Aquí decimos dónde está nuestro servidor (el archivo server.js)
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  // Función para enviar datos de registro
  registrar(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/registro`, usuario);
  }

  // Función para enviar datos de login
  login(credenciales: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credenciales);
  }
}
