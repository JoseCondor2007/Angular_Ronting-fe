import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ListaReservasComponent } from './lista-reserva.component';
import { ReservaService } from '../../servicios/reserva.service';
import { ReservaBoleto } from '../../modelos/cine-reserva.interface';

describe('ListaReservasComponent', () => {
  let component: ListaReservasComponent;
  let fixture: ComponentFixture<ListaReservasComponent>;
  let mockReservaService: jasmine.SpyObj<ReservaService>;

  const mockReservas: ReservaBoleto[] = [
    {
      id: 1,
      idPelicula: 1,
      tituloPelicula: 'Duna: Parte Dos',
      fechaFuncion: new Date('2024-12-25'),
      horaFuncion: '19:00',
      sala: 3,
      asientos: ['A1', 'A2'],
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      precioTotal: 24.00,
      nombreCliente: 'Juan Pérez',
      telefonoCliente: '1234567890',
      correoCliente: 'juan@example.com',
      estado: 'pendiente',
      fechaReserva: new Date(),
      metodoPago: 'tarjeta'
    },
    {
      id: 2,
      idPelicula: 2,
      tituloPelicula: 'Godzilla y Kong',
      fechaFuncion: new Date('2024-12-26'),
      horaFuncion: '21:30',
      sala: 2,
      asientos: ['B5'],
      cantidadBoletos: 1,
      tipoBoleto: 'niño',
      precioTotal: 8.00,
      nombreCliente: 'María García',
      telefonoCliente: '0987654321',
      correoCliente: 'maria@example.com',
      estado: 'confirmada',
      fechaReserva: new Date(),
      metodoPago: 'efectivo'
    }
  ];

  const mockReservasCanceladas: ReservaBoleto[] = [
    {
      id: 3,
      idPelicula: 3,
      tituloPelicula: 'Kung Fu Panda 4',
      fechaFuncion: new Date('2024-12-24'),
      horaFuncion: '16:30',
      sala: 1,
      asientos: ['C3', 'C4'],
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      precioTotal: 24.00,
      nombreCliente: 'Carlos López',
      telefonoCliente: '1122334455',
      correoCliente: 'carlos@example.com',
      estado: 'cancelada',
      fechaReserva: new Date(),
      fechaCancelacion: new Date(),
      metodoPago: 'transferencia'
    }
  ];

  beforeEach(async () => {
    const reservaServiceSpy = jasmine.createSpyObj('ReservaService', [
      'obtenerReservas',
      'obtenerReservasCanceladas',
      'agregarReserva',
      'actualizarReserva',
      'cancelarReserva',
      'confirmarReserva',
      'marcarReservaUtilizada',
      'restaurarReserva'
    ]);

    await TestBed.configureTestingModule({
      imports: [ListaReservasComponent, FormsModule],
      providers: [
        { provide: ReservaService, useValue: reservaServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaReservasComponent);
    component = fixture.componentInstance;
    mockReservaService = TestBed.inject(ReservaService) as jasmine.SpyObj<ReservaService>;
    
    // Configurar valores de retorno para los spies
    mockReservaService.obtenerReservas.and.returnValue(mockReservas);
    mockReservaService.obtenerReservasCanceladas.and.returnValue(mockReservasCanceladas);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load reservations on initialization', () => {
    expect(mockReservaService.obtenerReservas).toHaveBeenCalled();
    expect(mockReservaService.obtenerReservasCanceladas).toHaveBeenCalled();
    expect(component.reservas.length).toBe(2);
    expect(component.reservasCanceladas.length).toBe(1);
  });

  it('should show form when creating new reservation', () => {
    component.onNuevaReserva();
    
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.reservaEditando).toBeUndefined();
  });

  it('should show form with reservation data when editing', () => {
    const reserva = mockReservas[0];
    component.onEditarReserva(reserva);
    
    expect(component.mostrarFormulario).toBeTrue();
    expect(component.reservaEditando).toBe(reserva);
  });

  it('should call service to add new reservation', () => {
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
      nombreCliente: 'Test User',
      telefonoCliente: '1234567890',
      correoCliente: 'test@example.com',
      estado: 'pendiente' as const, // CORRECCIÓN: agregar 'as const'
      fechaReserva: new Date(),
      metodoPago: 'tarjeta'
    };

    component.onGuardarReserva(nuevaReserva);
    
    // CORRECCIÓN: Usar jasmine.any(Object) o jasmine.objectContaining
    expect(mockReservaService.agregarReserva).toHaveBeenCalledWith(jasmine.objectContaining({
      idPelicula: 1,
      tituloPelicula: 'Test Movie',
      cantidadBoletos: 2,
      tipoBoleto: 'adulto'
    }));
    expect(component.mostrarFormulario).toBeFalse();
  });

  it('should call service to update existing reservation', () => {
    const reservaEditada = mockReservas[0];
    component.reservaEditando = reservaEditada;
    
    const datosActualizados = {
      nombreCliente: 'Nombre Actualizado',
      cantidadBoletos: 3
    };

    component.onGuardarReserva(datosActualizados);
    
    expect(mockReservaService.actualizarReserva).toHaveBeenCalledWith(reservaEditada.id, datosActualizados);
  });

  it('should cancel reservation when confirmed', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.onCancelarReserva(1);
    
    expect(mockReservaService.cancelarReserva).toHaveBeenCalledWith(1);
  });

  it('should confirm reservation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.onConfirmarReserva(1);
    
    expect(mockReservaService.confirmarReserva).toHaveBeenCalledWith(1);
  });

  it('should mark reservation as used', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.onMarcarUtilizada(1);
    
    expect(mockReservaService.marcarReservaUtilizada).toHaveBeenCalledWith(1);
  });

  it('should restore cancelled reservation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    
    component.onRestaurarReserva(3);
    
    expect(mockReservaService.restaurarReserva).toHaveBeenCalledWith(3);
  });

  it('should filter reservations by search text', () => {
    component.textoBusqueda = 'Juan';
    
    const resultados = component.reservasFiltradas;
    
    expect(resultados.length).toBe(1);
    expect(resultados[0].nombreCliente).toBe('Juan Pérez');
  });

  it('should filter cancelled reservations by search text', () => {
    component.textoBusqueda = 'Carlos';
    
    const resultados = component.reservasCanceladasFiltradas;
    
    expect(resultados.length).toBe(1);
    expect(resultados[0].nombreCliente).toBe('Carlos López');
  });

  it('should return all reservations when search text is empty', () => {
    component.textoBusqueda = '';
    
    expect(component.reservasFiltradas.length).toBe(2);
    expect(component.reservasCanceladasFiltradas.length).toBe(1);
  });

  it('should format date correctly', () => {
    const fecha = new Date('2024-12-25');
    const fechaFormateada = component.formatearFecha(fecha);
    
    expect(fechaFormateada).toBe('25/12/2024');
  });

  it('should format price correctly', () => {
    const precioFormateado = component.formatearPrecio(24.50);
    
    expect(precioFormateado).toContain('$');
    expect(precioFormateado).toContain('24.50');
  });

  it('should toggle between active and cancelled reservations view', () => {
    expect(component.mostrarReservasCanceladas).toBeFalse();
    
    component.toggleReservasCanceladas();
    
    expect(component.mostrarReservasCanceladas).toBeTrue();
    
    component.toggleReservasCanceladas();
    
    expect(component.mostrarReservasCanceladas).toBeFalse();
  });

  it('should provide reservation statistics', () => {
    const estadisticas = component.estadisticasReservas;
    
    expect(estadisticas.total).toBe(2);
    expect(estadisticas.pendientes).toBe(1);
    expect(estadisticas.confirmadas).toBe(1);
    expect(estadisticas.canceladas).toBe(1);
  });

  it('should count reservations by state', () => {
    const countPendientes = component.contarReservasPorEstado('pendiente');
    const countConfirmadas = component.contarReservasPorEstado('confirmada');
    
    expect(countPendientes).toBe(1);
    expect(countConfirmadas).toBe(1);
  });

  it('should get reservations by specific state', () => {
    const reservasPendientes = component.getReservasPorEstado('pendiente');
    
    expect(reservasPendientes.length).toBe(1);
    expect(reservasPendientes[0].estado).toBe('pendiente');
  });

  it('should hide form when cancel is called', () => {
    component.mostrarFormulario = true;
    component.reservaEditando = mockReservas[0];
    
    component.onCancelarFormulario();
    
    expect(component.mostrarFormulario).toBeFalse();
    expect(component.reservaEditando).toBeUndefined();
  });
});