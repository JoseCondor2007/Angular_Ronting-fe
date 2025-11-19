import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { PantallaCargaComponent } from './componentes/pantalla-carga/pantalla-carga.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ListaReservasComponent } from './componentes/lista-reserva/lista-reserva.component';
import { ServiciosComponent } from './componentes/servicio/servicio.component';
import { ContactoComponent } from './componentes/contacto/contacto.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent },
  { path: 'carga', component: PantallaCargaComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'reservas', component: ListaReservasComponent },
  { path: 'servicios', component: ServiciosComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: '**', redirectTo: '/login' } 
];