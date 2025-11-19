import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pantalla-carga',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pantalla-carga.component.html',
  styleUrls: ['./pantalla-carga.component.css']
})
export class PantallaCargaComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Simular carga por 3 segundos
    setTimeout(() => {
      this.router.navigate(['/inicio']);
    }, 3000);
  }
}