import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReservaBoleto } from '../../modelos/cine-reserva.interface';
import { ReservaService } from '../../servicios/reserva.service';
import { FormularioReservaComponent } from '../formulario-reserva/formulario-reserva.component';

@Component({
  selector: 'app-lista-reservas',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioReservaComponent],
  templateUrl: './lista-reserva.component.html',
  styleUrls: ['./lista-reserva.component.css']
})
export class ListaReservasComponent implements OnInit {
  reservas: ReservaBoleto[] = [];
  reservasCanceladas: ReservaBoleto[] = [];
  reservaEditando?: ReservaBoleto;
  mostrarFormulario = false;
  mostrarReservasCanceladas = false;
  textoBusqueda = '';

  constructor(private reservaService: ReservaService) {}

  ngOnInit() {
    this.cargarReservas();
    this.cargarReservasCanceladas();
  }

  cargarReservas() {
    this.reservas = this.reservaService.obtenerReservas();
  }

  cargarReservasCanceladas() {
    this.reservasCanceladas = this.reservaService.obtenerReservasCanceladas();
  }

  onNuevaReserva() {
    this.reservaEditando = undefined;
    this.mostrarFormulario = true;
  }

  onEditarReserva(reserva: ReservaBoleto) {
    this.reservaEditando = reserva;
    this.mostrarFormulario = true;
  }

  onGuardarReserva(datosReserva: any) {
    if (this.reservaEditando) {
      // Editar reserva existente
      this.reservaService.actualizarReserva(this.reservaEditando.id, datosReserva);
    } else {
      // Agregar nueva reserva
      this.reservaService.agregarReserva(datosReserva);
    }
    
    this.cargarReservas();
    this.cargarReservasCanceladas();
    this.mostrarFormulario = false;
    this.reservaEditando = undefined;
  }

  onCancelarFormulario() {
    this.mostrarFormulario = false;
    this.reservaEditando = undefined;
  }

  onCancelarReserva(id: number) {
    if (confirm('¿Está seguro de que desea cancelar esta reserva? Podrá reactivarla más tarde.')) {
      this.reservaService.cancelarReserva(id);
      this.cargarReservas();
      this.cargarReservasCanceladas();
    }
  }

  onConfirmarReserva(id: number) {
    if (confirm('¿Confirmar esta reserva?')) {
      this.reservaService.confirmarReserva(id);
      this.cargarReservas();
    }
  }

  onMarcarUtilizada(id: number) {
    if (confirm('¿Marcar esta reserva como utilizada?')) {
      this.reservaService.marcarReservaUtilizada(id);
      this.cargarReservas();
    }
  }

  onRestaurarReserva(id: number) {
    if (confirm('¿Reactivar esta reserva?')) {
      this.reservaService.restaurarReserva(id);
      this.cargarReservas();
      this.cargarReservasCanceladas();
    }
  }

  toggleReservasCanceladas() {
    this.mostrarReservasCanceladas = !this.mostrarReservasCanceladas;
  }

  get reservasFiltradas(): ReservaBoleto[] {
    if (!this.textoBusqueda) {
      return this.reservas;
    }
    
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.reservas.filter(reserva =>
      reserva.nombreCliente.toLowerCase().includes(busqueda) ||
      reserva.tituloPelicula.toLowerCase().includes(busqueda) ||
      reserva.telefonoCliente.includes(busqueda)
    );
  }

  get reservasCanceladasFiltradas(): ReservaBoleto[] {
    if (!this.textoBusqueda) {
      return this.reservasCanceladas;
    }
    
    const busqueda = this.textoBusqueda.toLowerCase();
    return this.reservasCanceladas.filter(reserva =>
      reserva.nombreCliente.toLowerCase().includes(busqueda) ||
      reserva.tituloPelicula.toLowerCase().includes(busqueda) ||
      reserva.telefonoCliente.includes(busqueda)
    );
  }

  formatearFecha(fecha: Date): string {
    return new Date(fecha).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(precio);
  }

  // Método para obtener reservas por estado específico
  getReservasPorEstado(estado: string): ReservaBoleto[] {
    return this.reservas.filter(reserva => reserva.estado === estado);
  }

  // Método para contar reservas por estado
  contarReservasPorEstado(estado: string): number {
    return this.reservas.filter(reserva => reserva.estado === estado).length;
  }

  // Método para obtener estadísticas rápidas
  get estadisticasReservas() {
    return {
      total: this.reservas.length,
      pendientes: this.contarReservasPorEstado('pendiente'),
      confirmadas: this.contarReservasPorEstado('confirmada'),
      utilizadas: this.contarReservasPorEstado('utilizada'),
      canceladas: this.reservasCanceladas.length
    };
  }
}