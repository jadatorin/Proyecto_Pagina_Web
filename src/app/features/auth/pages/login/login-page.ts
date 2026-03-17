import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss'
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
