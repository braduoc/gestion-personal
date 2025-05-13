import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,GestionUsuariosComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'GestionPersonalAngular';
}
