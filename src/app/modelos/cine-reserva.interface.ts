export interface ReservaBoleto {
  id: number;
  idPelicula: number;
  tituloPelicula: string;
  fechaFuncion: Date;
  horaFuncion: string;
  sala: number;
  asientos: string[]; // Ejemplo: ["A1", "A2", "B5"]
  cantidadBoletos: number;
  tipoBoleto: string; // "adulto", "niño", "estudiante", "tercera-edad"
  precioTotal: number;
  nombreCliente: string;
  telefonoCliente: string;
  correoCliente: string;
  estado: 'pendiente' | 'confirmada' | 'cancelada' | 'utilizada';
  fechaReserva: Date;
  codigoQR?: string; // Código único para la reserva
  metodoPago?: string; // "tarjeta", "efectivo", "transferencia"
  fechaCancelacion?: Date; // Para reservas canceladas
}