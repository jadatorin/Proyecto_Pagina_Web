import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './share/components/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  // templateUrl: './app.html',
  // styleUrl: './app.scss',
  standalone: true,
  template: `
    <app-nav-bar></app-nav-bar>
    <main class="container">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [
    `
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
      }
    `
  ]
})
export class App {
  protected readonly title = signal('Proyecto_Pagina_Web');
}
