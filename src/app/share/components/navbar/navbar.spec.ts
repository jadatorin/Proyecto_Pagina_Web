import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Navbar } from './navbar';

describe('Navbar', () => {
  let component: Navbar;
  let fixture: ComponentFixture<Navbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Navbar, RouterTestingModule, RouterLink, RouterLinkActive]
    }).compileComponents();

    fixture = TestBed.createComponent(Navbar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('nav ul li a');

    expect(links.length).toBe(2);
    expect(links[0].textContent).toContain('Inicio');
    expect(links[1].textContent).toContain('Sobre nosotros');
  });

  it('should have correct routerLink attributes', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const links = compiled.querySelectorAll('nav ul li a');

    expect(links[0].getAttribute('routerlink')).toBe('/home');
    expect(links[1].getAttribute('routerlink')).toBe('/about');
  });
});
