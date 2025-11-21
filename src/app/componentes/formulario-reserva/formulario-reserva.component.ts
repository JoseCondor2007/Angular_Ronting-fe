import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReservaBoleto } from '../../modelos/cine-reserva.interface';

@Component({
  selector: 'app-formulario-reserva',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-reserva.component.html',
  styleUrls: ['./formulario-reserva.component.css']
})
export class FormularioReservaComponent implements OnInit {
  @Input() reserva?: ReservaBoleto;
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  formularioReserva: FormGroup;
  esEdicion = false;
  mostrarErrorImagen = false;
  fechaHoy = new Date().toISOString().split('T')[0];

  // Datos estáticos para el formulario
  peliculas = [
    { id: 1, titulo: 'Wicked: For God', duracion: 242 },
    { id: 2, titulo: 'Depredador Tierras Salvajes', duracion: 147 },
    { id: 3, titulo: 'Teléfono Negro 2', duracion: 154 },
    { id: 4, titulo: 'El Correcaminos', duracion: 147 },
    { id: 5, titulo: 'Chavin de Huantar El Rescate del Siglo', duracion: 135 }
  ];

  horariosDisponibles = [
    '14:00', '16:30', '19:00', '21:30', '23:45'
  ];

  salas = [1, 2, 3, 4, 5, 6];
  asientosDisponibles = this.generarAsientos();
  asientosSeleccionados: string[] = [];
  asientosOcupados = ['A1', 'B5', 'C3', 'D7', 'E2']; // Simulación de asientos ocupados

  constructor(private fb: FormBuilder) {
    this.formularioReserva = this.crearFormulario();
  }

  ngOnInit() {
    if (this.reserva) {
      this.esEdicion = true;
      this.cargarDatosReserva();
    }

    // Escuchar cambios para cálculos dinámicos
    this.formularioReserva.get('cantidadBoletos')?.valueChanges.subscribe(() => {
      this.limpiarAsientosSeleccionados();
    });

    this.formularioReserva.get('tipoBoleto')?.valueChanges.subscribe(() => {
      this.calcularPrecioTotal();
    });
  }

  crearFormulario(): FormGroup {
    return this.fb.group({
      idPelicula: ['', Validators.required],
      fechaFuncion: ['', [Validators.required, this.validarFechaFutura]],
      horaFuncion: ['', Validators.required],
      sala: ['', Validators.required],
      cantidadBoletos: ['', [Validators.required, Validators.min(1), Validators.max(9)]],
      tipoBoleto: ['', Validators.required],
      precioTotal: [0, [Validators.required, Validators.min(0.01)]],
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      telefonoCliente: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      correoCliente: ['', [Validators.required, Validators.email]],
      metodoPago: [''],
      estado: ['pendiente'],
      asientos: [[], [Validators.required, Validators.minLength(1)]]
    });
  }

  cargarDatosReserva() {
    if (this.reserva) {
      this.asientosSeleccionados = [...this.reserva.asientos];
      
      this.formularioReserva.patchValue({
        idPelicula: this.reserva.idPelicula,
        fechaFuncion: this.formatearFecha(this.reserva.fechaFuncion),
        horaFuncion: this.reserva.horaFuncion,
        sala: this.reserva.sala,
        cantidadBoletos: this.reserva.cantidadBoletos,
        tipoBoleto: this.reserva.tipoBoleto,
        precioTotal: this.reserva.precioTotal,
        nombreCliente: this.reserva.nombreCliente,
        telefonoCliente: this.reserva.telefonoCliente,
        correoCliente: this.reserva.correoCliente,
        metodoPago: this.reserva.metodoPago || '',
        estado: this.reserva.estado,
        asientos: this.reserva.asientos
      });
    }
  }

  // Métodos para asientos
  generarAsientos(): string[] {
    const asientos: string[] = [];
    const filas = ['A', 'B', 'C', 'D', 'E', 'F'];
    const columnas = 8;
    
    filas.forEach(fila => {
      for (let i = 1; i <= columnas; i++) {
        asientos.push(`${fila}${i}`);
      }
    });
    
    return asientos;
  }

  seleccionarAsiento(asiento: string) {
    if (this.estaOcupado(asiento)) return;

    const index = this.asientosSeleccionados.indexOf(asiento);
    const cantidadBoletos = this.formularioReserva.get('cantidadBoletos')?.value || 0;

    if (index > -1) {
      // Deseleccionar
      this.asientosSeleccionados.splice(index, 1);
    } else {
      // Verificar límite de asientos
      if (this.asientosSeleccionados.length >= cantidadBoletos) {
        return; // No permitir seleccionar más asientos que boletos
      }
      this.asientosSeleccionados.push(asiento);
    }

    // Actualizar el formulario
    this.formularioReserva.patchValue({
      asientos: this.asientosSeleccionados
    });
  }

  estaSeleccionado(asiento: string): boolean {
    return this.asientosSeleccionados.includes(asiento);
  }

  estaOcupado(asiento: string): boolean {
    return this.asientosOcupados.includes(asiento);
  }

  limpiarAsientosSeleccionados() {
    this.asientosSeleccionados = [];
    this.formularioReserva.patchValue({ asientos: [] });
  }

  onCantidadBoletosChange() {
    const cantidad = this.formularioReserva.get('cantidadBoletos')?.value;
    if (this.asientosSeleccionados.length > cantidad) {
      this.asientosSeleccionados = this.asientosSeleccionados.slice(0, cantidad);
      this.formularioReserva.patchValue({ asientos: this.asientosSeleccionados });
    }
  }

  // Métodos para cálculos
  calcularPrecioTotal() {
    const cantidadBoletos = this.formularioReserva.get('cantidadBoletos')?.value || 0;
    const tipoBoleto = this.formularioReserva.get('tipoBoleto')?.value;
    
    const precios: { [key: string]: number } = {
      'adulto': 12.00,
      'niño': 8.00,
      'estudiante': 10.00,
      'tercera-edad': 9.00
    };

    const precioUnitario = precios[tipoBoleto] || 0;
    const precioTotal = cantidadBoletos * precioUnitario;

    this.formularioReserva.patchValue({ precioTotal });
  }

  // Event handlers
  onPeliculaSeleccionada(event: any) {
    // Aquí podrías cargar horarios específicos para la película seleccionada
    console.log('Película seleccionada:', event.target.value);
  }

  // Validadores
  validarFechaFutura(control: any) {
    if (!control.value) return null;

    const fechaSeleccionada = new Date(control.value);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);
    
    if (fechaSeleccionada < hoy) {
      return { fechaPasada: true };
    }
    return null;
  }

  // Métodos de utilidad
  formatearFecha(fecha: Date): string {
    return new Date(fecha).toISOString().split('T')[0];
  }

  onSubmit() {
    if (this.formularioReserva.valid) {
      const datosReserva = {
        ...this.formularioReserva.value,
        id: this.reserva?.id || 0 // En creación será 0, se asignará en el backend
      };
      this.guardar.emit(datosReserva);
    } else {
      this.marcarControlesComoSucios();
    }
  }

  marcarControlesComoSucios() {
    Object.keys(this.formularioReserva.controls).forEach(key => {
      this.formularioReserva.get(key)?.markAsTouched();
    });
  }

  onCancelar() {
    this.cancelar.emit();
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.formularioReserva.get(campo);
    return !!control && control.invalid && control.touched;
  }

  obtenerMensajeError(campo: string): string {
    const control = this.formularioReserva.get(campo);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['min']) {
        if (campo === 'cantidadBoletos') {
          return 'Mínimo 1 boleto';
        }
        return 'El valor debe ser mayor a 0';
      }
      if (control.errors['max']) {
        if (campo === 'cantidadBoletos') {
          return 'Máximo 10 boletos por reserva';
        }
      }
      if (control.errors['fechaPasada']) {
        return 'La fecha no puede ser anterior a la actual';
      }
      if (control.errors['pattern']) {
        if (campo === 'telefonoCliente') {
          return 'El teléfono debe tener 9 dígitos';
        }
      }
      if (control.errors['email']) {
        return 'Ingrese un correo electrónico válido';
      }
      if (control.errors['minLength'] && campo === 'asientos') {
        return 'Seleccione al menos un asiento';
      }
    }
    
    return '';
  }
}