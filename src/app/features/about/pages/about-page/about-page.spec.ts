import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AboutPage } from './about-page';

describe('AboutPage', () => {
  let component: AboutPage;
  let fixture: ComponentFixture<AboutPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutPage]
    }).compileComponents();

    fixture = TestBed.createComponent(AboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render about page content', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const paragraph = compiled.querySelector('p');

    expect(paragraph).toBeTruthy();
    expect(paragraph?.textContent).toContain('about-page works');
  });
});
