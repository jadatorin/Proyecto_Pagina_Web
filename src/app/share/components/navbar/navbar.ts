import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-bar',
  template: `
    <header>
      <nav aria-label="Navegación principal">
        <ul>
          <li>
            <a
              routerLink="/home"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              >Inicio</a
            >
          </li>
          <li>
            <a routerLink="/about" routerLinkActive="active">Sobre nosotros</a>
          </li>
          @if (authService.isLoggedIn()) {
            <li>
              <button class="logout-btn" (click)="logout()">Cerrar Sesión</button>
            </li>
          }
        </ul>
      </nav>
    </header>
  `,
  styles: [
    `
      header {
        background: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 1rem;
      }
      nav ul {
        display: flex;
        gap: 20px;
        list-style: none;
        padding: 0;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto;
      }
      a {
        color: #333;
        padding: 8px 12px;
        border-radius: 4px;
        transition:
          background 0.2s,
          color 0.2s;
      }
      a:hover {
        background: #f0f0f0;
      }
      .active {
        font-weight: bold;
        background: #e8eaf6;
        color: #3f51b5;
      }
      .logout-btn {
        background: none;
        border: 1px solid #999;
        padding: 6px 12px;
        border-radius: 4px;
        cursor: pointer;
        font-size: 14px;
        transition: background 0.2s;
      }
      .logout-btn:hover {
        background: #f0f0f0;
      }
    `
  ]
})
export class Navbar {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  logout(): void {
    this.authService.logout();
  }
}
