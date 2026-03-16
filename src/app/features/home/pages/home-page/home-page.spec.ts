import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home-page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, RouterTestingModule, RouterLink]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render welcome heading', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const heading = compiled.querySelector('h1');

    expect(heading).toBeTruthy();
    expect(heading?.textContent).toContain('Bienvenido a mi sitio web');
  });

  it('should render description paragraph', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraph = compiled.querySelector('p');

    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('Esta es la página de inicio');
  });

  it('should have link to about page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');

    expect(link).toBeTruthy();
    expect(link?.getAttribute('routerlink')).toBe('/about');
    expect(link?.textContent).toContain('Sobre nosotros');
  });
});
