import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h1>Iniciar Sesión</h1>
        <p class="subtitle">Bienvenido de nuevo</p>

        @if (errorMessage()) {
          <div class="error-message">
            {{ errorMessage() }}
          </div>
        }

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              placeholder="tu@email.com"
              [class.invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched"
            />
            @if (loginForm.get('email')?.invalid && loginForm.get('email')?.touched) {
              <span class="field-error">Email es requerido</span>
            }
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              placeholder="••••••••"
              [class.invalid]="
                loginForm.get('password')?.invalid && loginForm.get('password')?.touched
              "
            />
            @if (loginForm.get('password')?.invalid && loginForm.get('password')?.touched) {
              <span class="field-error">Contraseña es requerida</span>
            }
          </div>

          <button type="submit" class="btn-primary" [disabled]="isLoading() || loginForm.invalid">
            @if (isLoading()) {
              <span class="spinner"></span>
            } @else {
              Iniciar Sesión
            }
          </button>
        </form>

        <div class="divider">
          <span>o</span>
        </div>

        <button
          type="button"
          class="btn-google"
          (click)="loginWithGoogle()"
          [disabled]="isLoading()"
        >
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continuar con Google
        </button>

        <p class="demo-hint">Demo: test&#64;example.com / password123</p>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        padding: 20px;
      }

      .login-card {
        background: white;
        padding: 40px;
        border-radius: 12px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h1 {
        margin: 0 0 8px;
        font-size: 28px;
        color: #333;
      }

      .subtitle {
        color: #666;
        margin-bottom: 24px;
      }

      .error-message {
        background: #fee;
        color: #c33;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 16px;
        font-size: 14px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;
        color: #333;
      }

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        transition: border-color 0.2s;
        box-sizing: border-box;
      }

      input:focus {
        outline: none;
        border-color: #3f51b5;
      }

      input.invalid {
        border-color: #f44336;
      }

      .field-error {
        color: #f44336;
        font-size: 12px;
        margin-top: 4px;
        display: block;
      }

      .btn-primary {
        width: 100%;
        padding: 14px;
        background: #3f51b5;
        color: white;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }

      .btn-primary:hover:not(:disabled) {
        background: #303f9f;
      }

      .btn-primary:disabled {
        background: #ccc;
        cursor: not-allowed;
      }

      .divider {
        display: flex;
        align-items: center;
        margin: 24px 0;
        color: #999;
      }

      .divider::before,
      .divider::after {
        content: '';
        flex: 1;
        height: 1px;
        background: #ddd;
      }

      .divider span {
        padding: 0 16px;
      }

      .btn-google {
        width: 100%;
        padding: 12px;
        background: white;
        color: #333;
        border: 1px solid #ddd;
        border-radius: 8px;
        font-size: 16px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: background 0.2s;
      }

      .btn-google:hover:not(:disabled) {
        background: #f5f5f5;
      }

      .btn-google:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      .spinner {
        width: 20px;
        height: 20px;
        border: 2px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .demo-hint {
        margin-top: 24px;
        text-align: center;
        font-size: 12px;
        color: #999;
      }
    `
  ]
})
export class LoginPage {
  loginForm: FormGroup;
  isLoading = signal(false);
  errorMessage = signal<string | null>(null);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;
    const success = await this.authService.login({ email, password });

    this.isLoading.set(false);

    if (success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.errorMessage.set('Credenciales inválidas. Intenta con test@example.com / password123');
    }
  }

  async loginWithGoogle(): Promise<void> {
    this.isLoading.set(true);
    this.errorMessage.set(null);

    const success = await this.authService.loginWithGoogle();

    this.isLoading.set(false);

    if (success) {
      const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
      this.router.navigateByUrl(returnUrl);
    } else {
      this.errorMessage.set('Error al iniciar sesión con Google');
    }
  }
}
