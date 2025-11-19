import { TestBed } from '@angular/core/testing';
import { ReservaService } from './reserva.service';
import { ReservaBoleto } from '../modelos/cine-reserva.interface';

describe('ReservaService', () => {
  let service: ReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with sample reservations', () => {
    const reservas = service.obtenerReservas();
    const reservasCanceladas = service.obtenerReservasCanceladas();
    
    expect(reservas.length).toBeGreaterThan(0);
    expect(reservasCanceladas.length).toBeGreaterThan(0);
  });

  it('should return active reservations (non-cancelled)', () => {
    const reservas = service.obtenerReservas();
    
    reservas.forEach(reserva => {
      expect(reserva.estado).not.toBe('cancelada');
    });
  });

  it('should return cancelled reservations', () => {
    const reservasCanceladas = service.obtenerReservasCanceladas();
    
    reservasCanceladas.forEach(reserva => {
      expect(reserva.estado).toBe('cancelada');
    });
  });

  it('should add new reservation', () => {
    const nuevaReserva = {
      idPelicula: 1,
      tituloPelicula: 'Test Movie',
      fechaFuncion: new Date('2025-11-25'),
      horaFuncion: '19:00',
      sala: 3,
      asientos: ['A1', 'A2'],
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      precioTotal: 24.00,
      nombreCliente: 'Test Client',
      telefonoCliente: '1234567890',
      correoCliente: 'test@example.com',
      estado: 'pendiente' as const,
      fechaReserva: new Date(),
      metodoPago: 'tarjeta'
    };

    const initialCount = service.obtenerReservas().length;
    service.agregarReserva(nuevaReserva);
    const finalCount = service.obtenerReservas().length;

    expect(finalCount).toBe(initialCount + 1);
  });

  it('should update existing reservation', () => {
    const reservas = service.obtenerReservas();
    const primeraReserva = reservas[0];
    const nuevosDatos = { nombreCliente: 'Nombre Actualizado' };

    const resultado = service.actualizarReserva(primeraReserva.id, nuevosDatos);
    
    expect(resultado).toBeTrue();
    
    const reservaActualizada = service.obtenerReservaPorId(primeraReserva.id);
    expect(reservaActualizada?.nombreCliente).toBe('Nombre Actualizado');
  });

  it('should cancel reservation', () => {
    const reservas = service.obtenerReservas();
    const reservaACancelar = reservas.find(r => r.estado === 'pendiente');
    
    if (reservaACancelar) {
      const resultado = service.cancelarReserva(reservaACancelar.id);
      
      expect(resultado).toBeTrue();
      
      const reservaCancelada = service.obtenerReservaPorId(reservaACancelar.id);
      expect(reservaCancelada?.estado).toBe('cancelada');
      expect(reservaCancelada?.fechaCancelacion).toBeDefined();
    }
  });

  it('should confirm pending reservation', () => {
    const reservasPendientes = service.obtenerReservasPorEstado('pendiente');
    
    if (reservasPendientes.length > 0) {
      const reservaAConfirmar = reservasPendientes[0];
      const resultado = service.confirmarReserva(reservaAConfirmar.id);
      
      expect(resultado).toBeTrue();
      
      const reservaConfirmada = service.obtenerReservaPorId(reservaAConfirmar.id);
      expect(reservaConfirmada?.estado).toBe('confirmada');
    }
  });

  it('should mark reservation as used', () => {
    const reservasConfirmadas = service.obtenerReservasPorEstado('confirmada');
    
    if (reservasConfirmadas.length > 0) {
      const reservaAMarcar = reservasConfirmadas[0];
      const resultado = service.marcarReservaUtilizada(reservaAMarcar.id);
      
      expect(resultado).toBeTrue();
      
      const reservaUtilizada = service.obtenerReservaPorId(reservaAMarcar.id);
      expect(reservaUtilizada?.estado).toBe('utilizada');
    }
  });

  it('should restore cancelled reservation', () => {
    const reservasCanceladas = service.obtenerReservasCanceladas();
    
    if (reservasCanceladas.length > 0) {
      const reservaARestaurar = reservasCanceladas[0];
      const resultado = service.restaurarReserva(reservaARestaurar.id);
      
      expect(resultado).toBeTrue();
      
      const reservaRestaurada = service.obtenerReservaPorId(reservaARestaurar.id);
      expect(reservaRestaurada?.estado).toBe('pendiente');
      expect(reservaRestaurada?.fechaCancelacion).toBeUndefined();
    }
  });

  it('should return reservation by id', () => {
    const reservas = service.obtenerReservas();
    const primeraReserva = reservas[0];
    
    const reservaEncontrada = service.obtenerReservaPorId(primeraReserva.id);
    
    expect(reservaEncontrada).toBeDefined();
    expect(reservaEncontrada?.id).toBe(primeraReserva.id);
  });

  it('should return undefined for non-existent reservation id', () => {
    const reservaEncontrada = service.obtenerReservaPorId(9999);
    
    expect(reservaEncontrada).toBeUndefined();
  });

  it('should return reservations by state', () => {
    const reservasPendientes = service.obtenerReservasPorEstado('pendiente');
    const reservasConfirmadas = service.obtenerReservasPorEstado('confirmada');
    const reservasUtilizadas = service.obtenerReservasPorEstado('utilizada');
    
    reservasPendientes.forEach(r => expect(r.estado).toBe('pendiente'));
    reservasConfirmadas.forEach(r => expect(r.estado).toBe('confirmada'));
    reservasUtilizadas.forEach(r => expect(r.estado).toBe('utilizada'));
  });

  it('should return reservations by movie', () => {
    const reservasPelicula1 = service.obtenerReservasPorPelicula(1);
    
    reservasPelicula1.forEach(reserva => {
      expect(reserva.idPelicula).toBe(1);
    });
  });

  it('should return available movies', () => {
    const peliculas = service.obtenerPeliculasDisponibles();
    
    expect(peliculas.length).toBeGreaterThan(0);
    expect(peliculas[0].id).toBeDefined();
    expect(peliculas[0].titulo).toBeDefined();
    expect(peliculas[0].duracion).toBeDefined();
  });

  it('should return available showtimes', () => {
    const horarios = service.obtenerHorariosDisponibles();
    
    expect(horarios.length).toBeGreaterThan(0);
    expect(horarios).toContain('19:00');
  });

  it('should return available rooms', () => {
    const salas = service.obtenerSalasDisponibles();
    
    expect(salas.length).toBeGreaterThan(0);
    expect(salas).toContain(1);
  });

  it('should generate unique IDs for new reservations', () => {
    const nuevaReserva = {
      idPelicula: 1,
      tituloPelicula: 'Unique ID Test',
      fechaFuncion: new Date('2025-11-30'),
      horaFuncion: '20:00',
      sala: 4,
      asientos: ['B1'],
      cantidadBoletos: 1,
      tipoBoleto: 'adulto',
      precioTotal: 12.00,
      nombreCliente: 'Test User',
      telefonoCliente: '111222333',
      correoCliente: 'test@example.com',
      estado: 'pendiente' as const,
      fechaReserva: new Date(),
      metodoPago: 'efectivo'
    };

    service.agregarReserva(nuevaReserva);
    const reservas = service.obtenerTodasLasReservas();
    
    const ids = reservas.map(r => r.id);
    const uniqueIds = new Set(ids);
    
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should set default values for new reservations', () => {
    const nuevaReserva = {
      idPelicula: 1,
      tituloPelicula: 'Default Values Test',
      fechaFuncion: new Date('2025-11-28'),
      horaFuncion: '18:00',
      sala: 2,
      asientos: ['C3'],
      cantidadBoletos: 1,
      tipoBoleto: 'adulto',
      precioTotal: 12.00,
      nombreCliente: 'Test Client',
      telefonoCliente: '444555666',
      correoCliente: 'client@example.com',
      metodoPago: 'tarjeta'
    };

    service.agregarReserva(nuevaReserva as any);
    const reservas = service.obtenerReservas();
    const ultimaReserva = reservas[reservas.length - 1];

    expect(ultimaReserva.estado).toBe('pendiente');
    expect(ultimaReserva.fechaReserva).toBeDefined();
    expect(ultimaReserva.codigoQR).toBeDefined();
  });

  it('should not confirm non-pending reservation', () => {
    const reservasConfirmadas = service.obtenerReservasPorEstado('confirmada');
    
    if (reservasConfirmadas.length > 0) {
      const resultado = service.confirmarReserva(reservasConfirmadas[0].id);
      expect(resultado).toBeFalse();
    }
  });

  it('should not mark non-confirmed reservation as used', () => {
    const reservasPendientes = service.obtenerReservasPorEstado('pendiente');
    
    if (reservasPendientes.length > 0) {
      const resultado = service.marcarReservaUtilizada(reservasPendientes[0].id);
      expect(resultado).toBeFalse();
    }
  });

  it('should not restore non-cancelled reservation', () => {
    const reservasActivas = service.obtenerReservas();
    
    if (reservasActivas.length > 0) {
      const resultado = service.restaurarReserva(reservasActivas[0].id);
      expect(resultado).toBeFalse();
    }
  });
});