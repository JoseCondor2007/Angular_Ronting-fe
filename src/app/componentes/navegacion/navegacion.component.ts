import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navegacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
  menuAbierto = false;
  mostrarNavegacion = true;
  rutaActual: string = '';

  constructor(private router: Router) {
    // Ocultar navegación en login y pantalla de carga
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        const url = event.urlAfterRedirects || event.url;
        this.mostrarNavegacion = !['/login', '/carga'].includes(url);
        this.rutaActual = url;
      });
  }

  alternarMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarSesion() {
    this.router.navigate(['/login']);
  }

  esRutaActiva(ruta: string): boolean {
    return this.rutaActual === ruta;
  }

  navegarYcerrarMenu(ruta: string) {
    this.router.navigate([ruta]);
    this.menuAbierto = false;
  }
}