import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FormularioReservaComponent } from './formulario-reserva.component';
import { ReservaBoleto } from '../../modelos/cine-reserva.interface';

describe('FormularioReservaComponent', () => {
  let component: FormularioReservaComponent;
  let fixture: ComponentFixture<FormularioReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioReservaComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values when no reservation is provided', () => {
    expect(component.formularioReserva).toBeDefined();
    expect(component.formularioReserva.get('idPelicula')?.value).toBe('');
    expect(component.formularioReserva.get('nombreCliente')?.value).toBe('');
    expect(component.formularioReserva.get('cantidadBoletos')?.value).toBe('');
  });

  it('should load reservation data when reserva input is provided', () => {
    const mockReserva: ReservaBoleto = {
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
    };

    component.reserva = mockReserva;
    component.ngOnInit();

    expect(component.esEdicion).toBeTrue();
    expect(component.formularioReserva.get('idPelicula')?.value).toBe(1);
    expect(component.formularioReserva.get('nombreCliente')?.value).toBe('Juan Pérez');
    expect(component.formularioReserva.get('cantidadBoletos')?.value).toBe(2);
  });

  it('should validate required fields', () => {
    const form = component.formularioReserva;
    
    expect(form.valid).toBeFalse();

    form.patchValue({
      idPelicula: 1,
      fechaFuncion: '2024-12-25',
      horaFuncion: '19:00',
      sala: 3,
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      nombreCliente: 'Juan Pérez',
      telefonoCliente: '1234567890',
      correoCliente: 'juan@example.com',
      asientos: ['A1']
    });

    expect(form.valid).toBeTrue();
  });

  it('should validate email format', () => {
    const emailControl = component.formularioReserva.get('correoCliente');
    
    emailControl?.setValue('invalid-email');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('valid@example.com');
    expect(emailControl?.valid).toBeTrue();
  });

  it('should validate phone number format', () => {
    const phoneControl = component.formularioReserva.get('telefonoCliente');
    
    phoneControl?.setValue('12345');
    expect(phoneControl?.valid).toBeFalse();

    phoneControl?.setValue('1234567890');
    expect(phoneControl?.valid).toBeTrue();
  });

  it('should calculate total price when ticket type and quantity change', () => {
    component.formularioReserva.patchValue({
      tipoBoleto: 'adulto',
      cantidadBoletos: 2
    });

    component.calcularPrecioTotal();

    expect(component.formularioReserva.get('precioTotal')?.value).toBe(24.00);
  });

  it('should emit guardar event when form is valid and submitted', () => {
    spyOn(component.guardar, 'emit');

    component.formularioReserva.patchValue({
      idPelicula: 1,
      fechaFuncion: '2024-12-25',
      horaFuncion: '19:00',
      sala: 3,
      cantidadBoletos: 2,
      tipoBoleto: 'adulto',
      precioTotal: 24.00,
      nombreCliente: 'Juan Pérez',
      telefonoCliente: '1234567890',
      correoCliente: 'juan@example.com',
      asientos: ['A1', 'A2']
    });

    component.onSubmit();

    expect(component.guardar.emit).toHaveBeenCalled();
  });

  it('should mark all controls as touched when form is invalid and submitted', () => {
    spyOn(component, 'marcarControlesComoSucios');

    component.formularioReserva.patchValue({
      nombreCliente: '' // Required field empty
    });

    component.onSubmit();

    expect(component.marcarControlesComoSucios).toHaveBeenCalled();
  });

  it('should emit cancelar event when onCancelar is called', () => {
    spyOn(component.cancelar, 'emit');
    
    component.onCancelar();
    
    expect(component.cancelar.emit).toHaveBeenCalled();
  });

  it('should generate seats correctly', () => {
    const asientos = component.generarAsientos();
    
    expect(asientos.length).toBe(48); // 6 filas * 8 columnas
    expect(asientos).toContain('A1');
    expect(asientos).toContain('F8');
  });

  it('should select and deselect seats correctly', () => {
    component.formularioReserva.patchValue({ cantidadBoletos: 2 });
    
    component.seleccionarAsiento('A1');
    expect(component.asientosSeleccionados).toContain('A1');
    
    component.seleccionarAsiento('A1');
    expect(component.asientosSeleccionados).not.toContain('A1');
  });

  it('should not select more seats than tickets quantity', () => {
    component.formularioReserva.patchValue({ cantidadBoletos: 1 });
    
    component.seleccionarAsiento('A1');
    component.seleccionarAsiento('A2'); // Should not be selected
    
    expect(component.asientosSeleccionados.length).toBe(1);
  });

  it('should clear selected seats when ticket quantity changes', () => {
    component.formularioReserva.patchValue({ cantidadBoletos: 2 });
    component.seleccionarAsiento('A1');
    component.seleccionarAsiento('A2');
    
    component.onCantidadBoletosChange();
    
    expect(component.asientosSeleccionados.length).toBe(0);
  });
});