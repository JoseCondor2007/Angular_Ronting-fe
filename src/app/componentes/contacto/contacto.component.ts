import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { trigger, transition, style, animate, query, stagger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css'],
  animations: [
    // Animación para el hero section
    trigger('heroContactAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(50px) scale(0.9)' }),
        animate('1000ms ease-out', 
          style({ opacity: 1, transform: 'translateY(0) scale(1)' }))
      ])
    ]),
    
    // Animación para elementos que aparecen en secuencia
    trigger('staggerContactAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateX(-30px)' }),
          stagger(100, [
            animate('500ms ease-out', 
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    
    // Animación para el formulario
    trigger('formAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.8) rotate(-2deg)' }),
        animate('600ms 300ms ease-out', 
          style({ opacity: 1, transform: 'scale(1) rotate(0)' }))
      ])
    ]),
    
    // Animación para tarjetas de información
    trigger('cardFlipAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'rotateY(90deg)' }),
        animate('600ms ease-out', 
          style({ opacity: 1, transform: 'rotateY(0)' }))
      ])
    ]),
    
    // Animación para el mapa
    trigger('mapAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.5) translateY(50px)' }),
        animate('800ms 400ms ease-out', 
          style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ])
    ]),
    
    // Animación de shake para errores
    trigger('shakeAnimation', [
      transition('* => *', [
        animate('500ms ease-in-out', 
          keyframes([
            style({ transform: 'translateX(0)', offset: 0 }),
            style({ transform: 'translateX(-10px)', offset: 0.2 }),
            style({ transform: 'translateX(10px)', offset: 0.4 }),
            style({ transform: 'translateX(-10px)', offset: 0.6 }),
            style({ transform: 'translateX(10px)', offset: 0.8 }),
            style({ transform: 'translateX(0)', offset: 1 })
          ])
        )
      ])
    ])
  ]
})
export class ContactoComponent {
  contactoForm: FormGroup;
  formularioEnviado = false;
  enviandoFormulario = false;

  sucursales = [
    {
      id: 1,
      nombre: 'CinePlanet Miraflores',
      direccion: 'Av. Larco 123, Miraflores',
      telefono: '+51 1 234-5678',
      horario: 'Lun-Dom: 10:00 AM - 2:00 AM',
      imagen: 'https://images.unsplash.com/photo-1489599563924-8c4c42dfb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      coordenadas: { lat: -12.122, lng: -77.030 }
    },
    {
      id: 2,
      nombre: 'CinePlanet San Isidro',
      direccion: 'Av. Javier Prado 456, San Isidro',
      telefono: '+51 1 345-6789',
      horario: 'Lun-Dom: 10:00 AM - 1:00 AM',
      imagen: 'https://images.unsplash.com/photo-1489599563924-8c4c42dfb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      coordenadas: { lat: -12.097, lng: -77.045 }
    },
    {
      id: 3,
      nombre: 'CinePlanet La Molina',
      direccion: 'Av. La Molina 789, La Molina',
      telefono: '+51 1 456-7890',
      horario: 'Lun-Dom: 10:00 AM - 12:00 AM',
      imagen: 'https://images.unsplash.com/photo-1489599563924-8c4c42dfb4c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      coordenadas: { lat: -12.085, lng: -76.945 }
    }
  ];

  departamentosContacto = [
    {
      nombre: 'Atención al Cliente',
      email: 'atencion@cineplanet.com',
      telefono: '+51 1 600-1234',
      horario: 'Lun-Dom: 8:00 AM - 11:00 PM',
      responsable: 'María González'
    },
    {
      nombre: 'Reservas y Ventas',
      email: 'reservas@cineplanet.com',
      telefono: '+51 1 600-5678',
      horario: 'Lun-Dom: 9:00 AM - 10:00 PM',
      responsable: 'Carlos Rodríguez'
    },
    {
      nombre: 'Eventos Especiales',
      email: 'eventos@cineplanet.com',
      telefono: '+51 1 600-9012',
      horario: 'Lun-Vie: 8:00 AM - 6:00 PM',
      responsable: 'Ana Martínez'
    },
    {
      nombre: 'Marketing y Prensa',
      email: 'prensa@cineplanet.com',
      telefono: '+51 1 600-3456',
      horario: 'Lun-Vie: 9:00 AM - 5:00 PM',
      responsable: 'Roberto Silva'
    }
  ];

  redesSociales = [
    {
      nombre: 'Facebook',
      icono: 'fab fa-facebook-f',
      url: 'https://facebook.com/cineplanet',
      color: '#1877F2'
    },
    {
      nombre: 'Instagram',
      icono: 'fab fa-instagram',
      url: 'https://instagram.com/cineplanet',
      color: '#E4405F'
    },
    {
      nombre: 'Twitter',
      icono: 'fab fa-twitter',
      url: 'https://twitter.com/cineplanet',
      color: '#1DA1F2'
    },
    {
      nombre: 'TikTok',
      icono: 'fab fa-tiktok',
      url: 'https://tiktok.com/@cineplanet',
      color: '#000000'
    },
    {
      nombre: 'YouTube',
      icono: 'fab fa-youtube',
      url: 'https://youtube.com/cineplanet',
      color: '#FF0000'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactoForm = this.crearFormulario();
  }

  private crearFormulario(): FormGroup {
    return this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.pattern(/^[0-9+\-\s()]{9,15}$/)]],
      departamento: ['', Validators.required],
      asunto: ['', [Validators.required, Validators.minLength(5)]],
      mensaje: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
      newsletter: [false]
    });
  }

  onSubmit() {
    if (this.contactoForm.valid) {
      this.enviandoFormulario = true;
      
      // Simular envío del formulario
      setTimeout(() => {
        this.formularioEnviado = true;
        this.enviandoFormulario = false;
        this.contactoForm.reset();
        
        // Ocultar mensaje de éxito después de 5 segundos
        setTimeout(() => {
          this.formularioEnviado = false;
        }, 5000);
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactoForm.controls).forEach(key => {
        this.contactoForm.get(key)?.markAsTouched();
      });
    }
  }

  esCampoInvalido(campo: string): boolean {
    const control = this.contactoForm.get(campo);
    return !!control && control.invalid && control.touched;
  }

  obtenerMensajeError(campo: string): string {
    const control = this.contactoForm.get(campo);
    
    if (control?.errors) {
      if (control.errors['required']) {
        return 'Este campo es requerido';
      }
      if (control.errors['email']) {
        return 'Ingrese un correo electrónico válido';
      }
      if (control.errors['minlength']) {
        return `Mínimo ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['maxlength']) {
        return `Máximo ${control.errors['maxlength'].requiredLength} caracteres`;
      }
      if (control.errors['pattern']) {
        return 'Formato de teléfono inválido';
      }
    }
    
    return '';
  }

  abrirGoogleMaps(coordenadas: any) {
    const url = `https://www.google.com/maps?q=${coordenadas.lat},${coordenadas.lng}`;
    window.open(url, '_blank');
  }

  hacerLlamada(telefono: string) {
    window.open(`tel:${telefono}`, '_self');
  }

  enviarEmail(email: string) {
    window.open(`mailto:${email}`, '_self');
  }

  abrirRedSocial(url: string) {
    window.open(url, '_blank');
  }

  // Método para obtener el color de fondo basado en el departamento seleccionado
  getDepartamentoColor(): string {
    const departamento = this.contactoForm.get('departamento')?.value;
    switch (departamento) {
      case 'Atención al Cliente': return '#B9090B';
      case 'Reservas y Ventas': return '#00D4FF';
      case 'Eventos Especiales': return '#FFA500';
      case 'Marketing y Prensa': return '#27ae60';
      default: return '#6c757d';
    }
  }
}