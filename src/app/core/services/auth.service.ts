import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, LoginCredentials, AuthResponse } from '../models/user.model';
import { AUTH } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal<boolean>(false);

  readonly user = this.currentUser.asReadonly();
  readonly isLoggedIn = this.isAuthenticated.asReadonly();
  readonly isAdmin = computed(() => this.currentUser()?.role === 'admin');

  constructor(private router: Router) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(AUTH.USER_KEY);
    const storedToken = localStorage.getItem(AUTH.TOKEN_KEY);

    if (storedUser && storedToken) {
      try {
        const user = JSON.parse(storedUser) as User;
        this.currentUser.set(user);
        this.isAuthenticated.set(true);
      } catch {
        this.clearStorage();
      }
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    try {
      const response = await this.mockLoginApi(credentials);
      this.handleAuthResponse(response);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  }

  async loginWithGoogle(): Promise<boolean> {
    try {
      const response = await this.mockGoogleSignIn();
      this.handleAuthResponse(response);
      return true;
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return false;
    }
  }

  private handleAuthResponse(response: AuthResponse): void {
    localStorage.setItem(AUTH.TOKEN_KEY, response.token);
    localStorage.setItem(AUTH.USER_KEY, JSON.stringify(response.user));
    this.currentUser.set(response.user);
    this.isAuthenticated.set(true);
  }

  logout(): void {
    this.clearStorage();
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private clearStorage(): void {
    localStorage.removeItem(AUTH.TOKEN_KEY);
    localStorage.removeItem(AUTH.USER_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(AUTH.TOKEN_KEY);
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  private async mockLoginApi(credentials: LoginCredentials): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (credentials.email === AUTH.DEMO_EMAIL && credentials.password === AUTH.DEMO_PASSWORD) {
      const payload = {
        sub: '1',
        email: credentials.email,
        name: 'Test User',
        role: 'user',
        exp: Math.floor((Date.now() + AUTH.TOKEN_EXPIRY_MS) / 1000)
      };
      return {
        user: {
          id: '1',
          email: credentials.email,
          name: 'Test User',
          role: 'user'
        },
        token: 'mock-jwt-token-' + Date.now() + '.' + btoa(JSON.stringify(payload)),
        refreshToken: 'mock-refresh-token-' + Date.now()
      };
    }

    throw new Error('Invalid credentials');
  }

  private async mockGoogleSignIn(): Promise<AuthResponse> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      user: {
        id: 'google-' + Date.now(),
        email: 'user@gmail.com',
        name: 'Google User',
        photoUrl: 'https://lh3.googleusercontent.com/a/default',
        role: 'user'
      },
      token: 'mock-google-token-' + Date.now(),
      refreshToken: 'mock-google-refresh-' + Date.now()
    };
  }
}
