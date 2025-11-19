import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NavegacionComponent } from './navegacion.component';

describe('NavegacionComponent', () => {
  let component: NavegacionComponent;
  let fixture: ComponentFixture<NavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavegacionComponent, RouterTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menu', () => {
    const initialMenuState = component.menuAbierto;
    component.alternarMenu();
    expect(component.menuAbierto).toBe(!initialMenuState);
  });

  it('should check active route', () => {
    component.rutaActual = '/inicio';
    expect(component.esRutaActiva('/inicio')).toBeTrue();
    expect(component.esRutaActiva('/reservas')).toBeFalse();
  });
});