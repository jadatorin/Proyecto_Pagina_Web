import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  selector: 'app-nav-bar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  protected readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  
  protected isMenuOpen = signal(false);

  toggleMenu(): void {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  logout(): void {
    this.authService.logout();
  }
}
