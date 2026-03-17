import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './share/components/navbar/navbar';
import { Footer } from './share/components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  // templateUrl: './app.html',
  // styleUrl: './app.scss',
  standalone: true,
  template: `
    <app-nav-bar></app-nav-bar>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }
      .container {
        flex: 1;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
    `
  ]
})
export class App {
  protected readonly title = signal('Proyecto_Pagina_Web');
}
