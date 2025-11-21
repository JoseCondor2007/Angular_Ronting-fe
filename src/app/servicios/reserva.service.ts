import { Injectable } from '@angular/core';
import { ReservaBoleto } from '../modelos/cine-reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {
  private reservas: ReservaBoleto[] = [];
  private siguienteId = 1;

  constructor() {
    this.inicializarDatos();
  }

  private inicializarDatos() {
    // Películas en cartelera para noviembre 2025 (basado en tendencias actuales)
    const peliculasCartelera = [
      {
        id: 1,
        titulo: 'Wicked: For Good',
        duracion: 162,
        genero: 'Musical',
        clasificacion: 'APT'
      },
      {
        id: 2,
        titulo: 'El Correcaminos',
        duracion: 107,
        genero: 'Acción',
        clasificacion: 'APT'
      },
      {
        id: 3,
        titulo: 'Depredador Tierras Salvajes',
        duracion: 106,
        genero: 'Acción',
        clasificacion: '+14'
      },
      {
        id: 4,
        titulo: 'Teléfono Negro 2',
        duracion: 114,
        genero: 'Terror',
        clasificacion: '+14'
      },
      {
        id: 5,
        titulo: 'El Cadaver de la Novia 20 Aniversario [2005]',
        duracion: 78,
        genero: 'Animación',
        clasificacion: '+14'
      },
      {
        id: 6,
        titulo: 'Chavin de Huantar El Rescate del Siglo',
        duracion: 95,
        genero: 'Acción',
        clasificacion: '+14'
      },
      {
        id: 7,
        titulo: 'Hablando Huevadas de Perú para el Mundo',
        duracion: 89,
        genero: 'Comedia',
        clasificacion: '+14'
      },
      {
        id: 8,
        titulo: 'Good boy',
        duracion: 72,
        genero: 'Terror',
        clasificacion: '+14'
      },
      {
        id: 9,
        titulo: 'Paw Patrol Especial de navidad',
        duracion: 68,
        genero: 'Animación',
        clasificacion: 'APT'
      },
      {
        id: 10,
        titulo: 'Zoopocalipsis',
        duracion: 92,
        genero: 'Animación',
        clasificacion: 'APT'
      },
      {
        id: 11,
        titulo: 'Crepusculo [2008]',
        duracion: 122,
        genero: 'Romance/Fantasía',
        clasificacion: '+14'
      },
      {
        id: 12,
        titulo: 'Terminal Zombie',
        duracion: 82,
        genero: 'Terror',
        clasificacion: '+14'
      }
    ];

    // Reservas de ejemplo para noviembre 2025
    const reservasEjemplo = [
      {
        idPelicula: 1,
        tituloPelicula: 'Wicked: For Good',
        fechaFuncion: new Date('2025-11-15'),
        horaFuncion: '19:00',
        sala: 3,
        asientos: ['A5', 'A6'],
        cantidadBoletos: 2,
        tipoBoleto: 'adulto',
        precioTotal: 24.00,
        nombreCliente: 'Ana María Rodríguez',
        telefonoCliente: '912345678',
        correoCliente: 'ana.rodriguez@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-10'),
        metodoPago: 'tarjeta',
        codigoQR: 'WICK001'
      },
      {
        idPelicula: 2,
        tituloPelicula: 'El Correcaminos',
        fechaFuncion: new Date('2025-11-16'),
        horaFuncion: '21:30',
        sala: 5,
        asientos: ['B3'],
        cantidadBoletos: 1,
        tipoBoleto: 'estudiante',
        precioTotal: 10.00,
        nombreCliente: 'Carlos Javier López',
        telefonoCliente: '923456789',
        correoCliente: 'carlos.lopez@email.com',
        estado: 'pendiente' as const,
        fechaReserva: new Date('2025-11-11'),
        metodoPago: 'efectivo',
        codigoQR: 'CORR002'
      },
      {
        idPelicula: 3,
        tituloPelicula: 'Depredador Tierras Salvajes',
        fechaFuncion: new Date('2025-11-14'),
        horaFuncion: '20:15',
        sala: 2,
        asientos: ['C7', 'C8', 'C9'],
        cantidadBoletos: 3,
        tipoBoleto: 'adulto',
        precioTotal: 36.00,
        nombreCliente: 'María Elena Santos',
        telefonoCliente: '934567890',
        correoCliente: 'maria.santos@email.com',
        estado: 'utilizada' as const,
        fechaReserva: new Date('2025-11-08'),
        metodoPago: 'tarjeta',
        codigoQR: 'DEPR003'
      },
      {
        idPelicula: 4,
        tituloPelicula: 'Teléfono Negro 2',
        fechaFuncion: new Date('2025-11-17'),
        horaFuncion: '16:00',
        sala: 1,
        asientos: ['D2', 'D3', 'D4', 'D5'],
        cantidadBoletos: 4,
        tipoBoleto: 'niño',
        precioTotal: 32.00,
        nombreCliente: 'Roberto Alejandro García',
        telefonoCliente: '945678901',
        correoCliente: 'roberto.garcia@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-12'),
        metodoPago: 'transferencia',
        codigoQR: 'TELE004'
      },
      {
        idPelicula: 5,
        tituloPelicula: 'El Cadaver de la Novia 20 Aniversario [2005]',
        fechaFuncion: new Date('2025-11-13'),
        horaFuncion: '22:00',
        sala: 4,
        asientos: ['E1', 'E2'],
        cantidadBoletos: 2,
        tipoBoleto: 'adulto',
        precioTotal: 24.00,
        nombreCliente: 'Laura Isabel Martínez',
        telefonoCliente: '956789012',
        correoCliente: 'laura.martinez@email.com',
        estado: 'pendiente' as const,
        fechaReserva: new Date('2025-11-09'),
        metodoPago: 'tarjeta',
        codigoQR: 'CADA005'
      },
      {
        idPelicula: 6,
        tituloPelicula: 'Chavin de Huantar El Rescate del Siglo',
        fechaFuncion: new Date('2025-11-18'),
        horaFuncion: '19:45',
        sala: 6,
        asientos: ['F8'],
        cantidadBoletos: 1,
        tipoBoleto: 'tercera-edad',
        precioTotal: 9.00,
        nombreCliente: 'Diego Fernando Herrera',
        telefonoCliente: '967890123',
        correoCliente: 'diego.herrera@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-13'),
        metodoPago: 'efectivo',
        codigoQR: 'CHAV006'
      },
      {
        idPelicula: 7,
        tituloPelicula: 'Hablando Huevadas de Perú para el Mundo',
        fechaFuncion: new Date('2025-11-19'),
        horaFuncion: '18:30',
        sala: 3,
        asientos: ['A1', 'A2', 'A3'],
        cantidadBoletos: 3,
        tipoBoleto: 'adulto',
        precioTotal: 36.00,
        nombreCliente: 'Sofía Alejandra Ramírez',
        telefonoCliente: '978901234',
        correoCliente: 'sofia.ramirez@email.com',
        estado: 'pendiente' as const,
        fechaReserva: new Date('2025-11-14'),
        metodoPago: 'tarjeta',
        codigoQR: 'HABL007'
      },
      {
        idPelicula: 8,
        tituloPelicula: 'Good boy',
        fechaFuncion: new Date('2025-11-20'),
        horaFuncion: '20:00',
        sala: 5,
        asientos: ['B5', 'B6'],
        cantidadBoletos: 2,
        tipoBoleto: 'estudiante',
        precioTotal: 20.00,
        nombreCliente: 'Jorge Luis Silva',
        telefonoCliente: '989012345',
        correoCliente: 'jorge.silva@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-15'),
        metodoPago: 'transferencia',
        codigoQR: 'GOOD008'
      },
      {
        idPelicula: 9,
        tituloPelicula: 'Paw Patrol Especial de navidad',
        fechaFuncion: new Date('2025-11-21'),
        horaFuncion: '21:15',
        sala: 2,
        asientos: ['C4', 'C5', 'C6'],
        cantidadBoletos: 3,
        tipoBoleto: 'adulto',
        precioTotal: 36.00,
        nombreCliente: 'Patricia Carolina Vargas',
        telefonoCliente: '990123456',
        correoCliente: 'patricia.vargas@email.com',
        estado: 'utilizada' as const,
        fechaReserva: new Date('2025-11-10'),
        metodoPago: 'tarjeta',
        codigoQR: 'PAW009'
      },
      {
        idPelicula: 10,
        tituloPelicula: 'Zoopocalipsis',
        fechaFuncion: new Date('2025-11-22'),
        horaFuncion: '15:30',
        sala: 1,
        asientos: ['D7', 'D8', 'D9', 'D10'],
        cantidadBoletos: 4,
        tipoBoleto: 'niño',
        precioTotal: 32.00,
        nombreCliente: 'Miguel Ángel Torres',
        telefonoCliente: '901234567',
        correoCliente: 'miguel.torres@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-16'),
        metodoPago: 'efectivo',
        codigoQR: 'ZOOP010'
      },
      {
        idPelicula: 11,
        tituloPelicula: 'Crepusculo [2008]',
        fechaFuncion: new Date('2025-11-23'),
        horaFuncion: '19:00',
        sala: 4,
        asientos: ['E5', 'E6'],
        cantidadBoletos: 2,
        tipoBoleto: 'adulto',
        precioTotal: 24.00,
        nombreCliente: 'Lucía Fernanda Castro',
        telefonoCliente: '912345679',
        correoCliente: 'lucia.castro@email.com',
        estado: 'confirmada' as const,
        fechaReserva: new Date('2025-11-17'),
        metodoPago: 'tarjeta',
        codigoQR: 'CREP011'
      },
      {
        idPelicula: 12,
        tituloPelicula: 'Terminal Zombie',
        fechaFuncion: new Date('2025-11-24'),
        horaFuncion: '22:30',
        sala: 3,
        asientos: ['F1', 'F2'],
        cantidadBoletos: 2,
        tipoBoleto: 'adulto',
        precioTotal: 24.00,
        nombreCliente: 'Ricardo Antonio Morales',
        telefonoCliente: '923456780',
        correoCliente: 'ricardo.morales@email.com',
        estado: 'pendiente' as const,
        fechaReserva: new Date('2025-11-18'),
        metodoPago: 'efectivo',
        codigoQR: 'TERM012'
      }
    ];

    // Agregar reservas de ejemplo
    reservasEjemplo.forEach(reserva => {
      this.agregarReserva(reserva);
    });

    // Agregar algunas reservas canceladas para demostración
    this.reservas.push({
      id: this.siguienteId++,
      idPelicula: 1,
      tituloPelicula: 'Wicked: For Good',
      fechaFuncion: new Date('2025-11-12'),
      horaFuncion: '20:00',
      sala: 3,
      asientos: ['A7', 'A8'],
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      precioTotal: 24.00,
      nombreCliente: 'Juan Carlos Méndez',
      telefonoCliente: '911223344',
      correoCliente: 'juan.mendez@email.com',
      estado: 'cancelada',
      fechaReserva: new Date('2025-11-05'),
      fechaCancelacion: new Date('2025-11-06'),
      metodoPago: 'tarjeta',
      codigoQR: 'CANC001'
    });

    this.reservas.push({
      id: this.siguienteId++,
      idPelicula: 2,
      tituloPelicula: 'El Correcaminos',
      fechaFuncion: new Date('2025-11-13'),
      horaFuncion: '19:30',
      sala: 5,
      asientos: ['B2'],
      cantidadBoletos: 1,
      tipoBoleto: 'estudiante',
      precioTotal: 10.00,
      nombreCliente: 'Carmen Rosa Ortega',
      telefonoCliente: '922334455',
      correoCliente: 'carmen.ortega@email.com',
      estado: 'cancelada',
      fechaReserva: new Date('2025-11-07'),
      fechaCancelacion: new Date('2025-11-08'),
      metodoPago: 'efectivo',
      codigoQR: 'CANC002'
    });
  }

  obtenerReservas(): ReservaBoleto[] {
    return this.reservas.filter(r => r.estado !== 'cancelada');
  }

  obtenerTodasLasReservas(): ReservaBoleto[] {
    return this.reservas;
  }

  obtenerReservaPorId(id: number): ReservaBoleto | undefined {
    return this.reservas.find(r => r.id === id);
  }

  agregarReserva(reserva: Omit<ReservaBoleto, 'id'>): void {
    const nuevaReserva: ReservaBoleto = {
      ...reserva,
      id: this.siguienteId++,
      estado: reserva.estado || 'pendiente',
      fechaReserva: reserva.fechaReserva || new Date(),
      codigoQR: reserva.codigoQR || `RES${this.siguienteId.toString().padStart(3, '0')}`
    };
    this.reservas.push(nuevaReserva);
  }

  actualizarReserva(id: number, reservaActualizada: Partial<ReservaBoleto>): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas[index] = {
        ...this.reservas[index],
        ...reservaActualizada
      };
      return true;
    }
    return false;
  }

  cancelarReserva(id: number): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1) {
      this.reservas[index].estado = 'cancelada';
      this.reservas[index].fechaCancelacion = new Date();
      return true;
    }
    return false;
  }

  confirmarReserva(id: number): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1 && this.reservas[index].estado === 'pendiente') {
      this.reservas[index].estado = 'confirmada';
      return true;
    }
    return false;
  }

  marcarReservaUtilizada(id: number): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1 && this.reservas[index].estado === 'confirmada') {
      this.reservas[index].estado = 'utilizada';
      return true;
    }
    return false;
  }

  restaurarReserva(id: number): boolean {
    const index = this.reservas.findIndex(r => r.id === id);
    if (index !== -1 && this.reservas[index].estado === 'cancelada') {
      this.reservas[index].estado = 'pendiente';
      this.reservas[index].fechaCancelacion = undefined;
      return true;
    }
    return false;
  }

  obtenerReservasCanceladas(): ReservaBoleto[] {
    return this.reservas.filter(r => r.estado === 'cancelada');
  }

  obtenerReservasPorEstado(estado: string): ReservaBoleto[] {
    return this.reservas.filter(r => r.estado === estado);
  }

  obtenerReservasPorPelicula(idPelicula: number): ReservaBoleto[] {
    return this.reservas.filter(r => r.idPelicula === idPelicula);
  }

  // Método para obtener información de películas disponibles
  obtenerPeliculasDisponibles() {
    return [
      { id: 1, titulo: 'Wicked: For Good', duracion: 145 },
      { id: 2, titulo: 'Avatar: The Last Adventure', duracion: 168 },
      { id: 3, titulo: 'The Batman: Gotham Knights', duracion: 132 },
      { id: 4, titulo: 'Frozen: The Northern Lights', duracion: 118 },
      { id: 5, titulo: 'Mission: Impossible - Legacy', duracion: 148 },
      { id: 6, titulo: 'Star Wars: New Republic', duracion: 155 },
      { id: 7, titulo: 'Jurassic World: Dominion Rising', duracion: 142 },
      { id: 8, titulo: 'The Marvels: Secret Invasion', duracion: 138 },
      { id: 9, titulo: 'Fast & Furious: Final Run', duracion: 140 },
      { id: 10, titulo: 'Pixar: Dreamscape', duracion: 112 }
    ];
  }

  // Método para obtener horarios disponibles
  obtenerHorariosDisponibles() {
    return ['14:00', '16:30', '19:00', '21:30', '23:45'];
  }

  // Método para obtener salas disponibles
  obtenerSalasDisponibles() {
    return [1, 2, 3, 4, 5, 6];
  }
}