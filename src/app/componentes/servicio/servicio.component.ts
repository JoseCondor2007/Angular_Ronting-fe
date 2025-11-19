import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServiciosComponent {
  preguntasAbiertas: boolean[] = [false, false, false, false, false];

  serviciosCompletos = [
    {
      icono: '🎬',
      titulo: 'Sala IMAX',
      descripcion: 'Vive la experiencia cinematográfica más inmersiva con nuestras pantallas gigantes IMAX y sonido de última generación.',
      caracteristicas: [
        'Pantallas gigantes de hasta 20 metros',
        'Sonido envolvente IMAX',
        'Proyección digital 4K',
        'Butacas especialmente diseñadas',
        'Experiencia 3D disponible'
      ],
      destacado: true
    },
    {
      icono: '🛋️',
      titulo: 'Butacas VIP',
      descripcion: 'Disfruta del máximo confort con nuestras butacas VIP reclinables y servicio personalizado.',
      caracteristicas: [
        'Butacas totalmente reclinables',
        'Servicio de comida y bebida incluido',
        'Mantas y almohadas disponibles',
        'Acceso prioritario',
        'Espacio amplio y privado'
      ],
      destacado: false
    },
    {
      icono: '🎧',
      titulo: 'Dolby Atmos',
      descripcion: 'Experimenta el sonido tridimensional que te rodea completamente con la tecnología Dolby Atmos.',
      caracteristicas: [
        'Sonido tridimensional envolvente',
        'Hasta 64 altavoces independientes',
        'Calidad de audio objeto por objeto',
        'Experiencia de sonido realista',
        'Compatible con todos los formatos'
      ],
      destacado: false
    },
    {
      icono: '🍿',
      titulo: 'Bar Gourmet',
      descripcion: 'Disfruta de una selección premium de comida y bebidas durante tu película.',
      caracteristicas: [
        'Hamburguesas artesanales',
        'Pizzas gourmet',
        'Bebidas premium y cocktails',
        'Postres especiales',
        'Servicio en butaca disponible'
      ],
      destacado: false
    },
    {
      icono: '🎪',
      titulo: 'Eventos Especiales',
      descripcion: 'Celebra tus eventos especiales con nosotros: estrenos, cumpleaños, empresas y más.',
      caracteristicas: [
        'Alquiler de salas privadas',
        'Estrenos exclusivos',
        'Eventos corporativos',
        'Cumpleaños y celebraciones',
        'Paquetes personalizados'
      ],
      destacado: false
    },
    {
      icono: '📱',
      titulo: 'App Móvil',
      descripcion: 'Reserva tus entradas, elige tus asientos y acumula puntos desde nuestra app móvil.',
      caracteristicas: [
        'Reservas en línea 24/7',
        'Selección de asientos',
        'Programa de fidelidad',
        'Notificaciones de estrenos',
        'Pagos seguros'
      ],
      destacado: false
    }
  ];

  preciosServicios = [
    {
      plan: 'Básico',
      precio: 'S/ 25',
      periodo: 'por persona',
      caracteristicas: [
        'Butacas estándar',
        'Proyección digital 2K',
        'Sonido surround 5.1',
        'Combo básico de popcorn',
        'Reservas online'
      ],
      popular: false
    },
    {
      plan: 'Premium',
      precio: 'S/ 45',
      periodo: 'por persona',
      caracteristicas: [
        'Butacas reclinables',
        'Proyección digital 4K',
        'Sonido Dolby Atmos',
        'Combo premium de popcorn',
        'Bebida gourmet incluida',
        'Acceso prioritario',
        'Reservas anticipadas'
      ],
      popular: true
    },
    {
      plan: 'VIP',
      precio: 'S/ 75',
      periodo: 'por persona',
      caracteristicas: [
        'Butacas VIP reclinables',
        'Sala IMAX disponible',
        'Sonido IMAX o Dolby Atmos',
        'Combo gourmet completo',
        'Bebida premium ilimitada',
        'Acceso express sin colas',
        'Manta y almohada',
        'Servicio en butaca'
      ],
      popular: false
    }
  ];

  preguntasFrecuentes = [
    {
      pregunta: '¿Cómo puedo reservar entradas?',
      respuesta: 'Puedes reservar entradas a través de nuestra página web, aplicación móvil o directamente en taquilla. Te recomendamos reservar online para asegurar tu lugar.'
    },
    {
      pregunta: '¿Qué diferencia hay entre sala regular e IMAX?',
      respuesta: 'Las salas IMAX cuentan con pantallas gigantes (hasta 20 metros), sonido envolvente especializado y butacas diseñadas para una experiencia completamente inmersiva.'
    },
    {
      pregunta: '¿Se puede cancelar o modificar una reserva?',
      respuesta: 'Sí, puedes cancelar o modificar tu reserva hasta 2 horas antes de la función a través de nuestra app o página web. Las cancelaciones tienen un cargo administrativo del 10%.'
    },
    {
      pregunta: '¿Hay descuentos para estudiantes o adultos mayores?',
      respuesta: 'Sí, ofrecemos 30% de descuento para estudiantes y adultos mayores en funciones de lunes a jueves. Presenta tu carné vigente en taquilla.'
    },
    {
      pregunta: '¿Puedo organizar un evento privado?',
      respuesta: '¡Absolutamente! Ofrecemos alquiler de salas para eventos privados: cumpleaños, empresas, estrenos exclusivos. Contáctanos para cotizar tu evento.'
    }
  ];

  togglePregunta(index: number) {
    this.preguntasAbiertas[index] = !this.preguntasAbiertas[index];
  }
}