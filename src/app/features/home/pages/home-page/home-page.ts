import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <h1>Bienvenido a mi sitio web</h1>
      <p>Esta es la página de inicio</p>
      <a routerLink="/about">Sobre nosotros</a>
    </main>
  `,
  styles: [
    `
      main {
        max-width: 800px;
        margin: 50px auto;
        padding: 20px;
        text-align: center;
      }
      h1 {
        color: #3f51b5;
      }
    `
  ]
})
export class HomePage {}
