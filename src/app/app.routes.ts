import { Routes } from '@angular/router';
// Fíjate que al final ponemos el nombre nuevo .component
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { UsuarioPanelComponent } from './components/usuario-panel/usuario-panel.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'index_administrador', component: AdminPanelComponent },
  { path: 'index_usuario', component: UsuarioPanelComponent }
];