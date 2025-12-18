import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuario-panel',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usuario-panel.component.html',
  styleUrl: './usuario-panel.css'
})
export class UsuarioPanelComponent {}
