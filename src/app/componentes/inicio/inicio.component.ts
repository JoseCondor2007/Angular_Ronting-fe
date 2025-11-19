import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  estadisticas = {
    salas: 25,
    peliculas: 300,
    clientes: 50000,
    anios: 15  // Cambiado de "años" a "anios"
  };

  peliculasCartelera = [
    {
      titulo: 'Avatar: El Camino del Agua',
      imagen: 'https://images.unsplash.com/photo-1489599809505-7c8e4518e859?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duracion: '3h 12m',
      genero: 'Ciencia Ficción',
      clasificacion: 'PG-13',
      sinopsis: 'Jake Sully y Ney\'tiri han formado una familia y hacen todo lo posible por permanecer juntos. Sin embargo, deben abandonar su hogar y explorar las regiones de Pandora.',
      estado: 'normal'
    },
    {
      titulo: 'Spider-Man: Across the Spider-Verse',
      imagen: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duracion: '2h 20m',
      genero: 'Animación',
      clasificacion: 'PG',
      sinopsis: 'Miles Morales regresa para una nueva aventura en la que viaja a través del Multiverso y se une a Gwen Stacy y un nuevo equipo de Spider-People.',
      estado: 'normal'
    },
    {
      titulo: 'Oppenheimer',
      imagen: 'https://images.unsplash.com/photo-1682686581427-7c80ab60e3f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duracion: '3h 00m',
      genero: 'Drama Histórico',
      clasificacion: 'R',
      sinopsis: 'La historia del físico J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante la Segunda Guerra Mundial.',
      estado: 'normal'
    },
    {
      titulo: 'Barbie',
      imagen: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      duracion: '1h 54m',
      genero: 'Comedia',
      clasificacion: 'PG-13',
      sinopsis: 'Barbie vive en Barbie Land, pero después de experimentar una crisis existencial, viaja al mundo humano para encontrar la verdadera felicidad.',
      estado: 'normal'
    }
  ];

  serviciosDestacados = [
    {
      icono: '🎬',
      titulo: 'Sala IMAX',
      descripcion: 'Pantallas gigantes con sonido envolvente para una experiencia cinematográfica inmersiva.'
    },
    {
      icono: '🛋️',
      titulo: 'Butacas VIP',
      descripcion: 'Asientos reclinables con servicio de comida y bebida incluido.'
    },
    {
      icono: '🎧',
      titulo: 'Sonido Dolby Atmos',
      descripcion: 'Tecnología de sonido tridimensional que te rodea completamente.'
    },
    {
      icono: '🍿',
      titulo: 'Bar Gourmet',
      descripcion: 'Comida y bebidas premium para disfrutar durante la película.'
    }
  ];

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onCardHover(index: number, isHovering: boolean) {
    this.peliculasCartelera[index].estado = isHovering ? 'hover' : 'normal';
  }
}