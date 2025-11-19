import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  nombre: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  showError: boolean = false;

  constructor(private router: Router) {}

  login() {
    this.isLoading = true;
    this.showError = false;

    // Simular validación asíncrona
    setTimeout(() => {
      // Credenciales predefinidas para el sistema de cine
      if (this.nombre === 'Admin Cine' && 
          this.password === 'cine123' && 
          this.email === 'admin@cine.com') {
        
        // Redirigir a pantalla de carga
        this.router.navigate(['/carga']);
      } else {
        this.showError = true;
      }
      
      this.isLoading = false;
    }, 1500);
  }
}