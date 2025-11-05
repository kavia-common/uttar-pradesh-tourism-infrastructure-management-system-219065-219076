import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { TextInputComponent } from '../../../shared/controls/text-input.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, TextInputComponent],
  template: `
    <div class="login-wrap">
      <form [formGroup]="form" (ngSubmit)="onSubmit()">
        <h2>Sign in</h2>
        <app-text-input label="Email" type="email" placeholder="you@example.com" formControlName="email"></app-text-input>
        <app-text-input label="Password" type="password" placeholder="••••••••" formControlName="password"></app-text-input>
        <button class="btn" type="submit" [disabled]="form.invalid || loading">
          {{ loading ? 'Signing in...' : 'Login' }}
        </button>
        <p class="hint">Use your UPSTDC account credentials.</p>
      </form>
    </div>
  `,
  styles: [`
    .login-wrap { min-height: 100vh; display: grid; place-items: center; background: linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.08)); padding: 16px; }
    form { width: 100%; max-width: 360px; background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; padding: 24px; box-shadow: 0 8px 20px rgba(0,0,0,0.04); }
    h2 { margin-bottom: 16px; color: #111827; }
    app-text-input { display: block; margin-bottom: 12px; }
    .btn { width: 100%; background: #3b82f6; color: #fff; border: none; padding: 10px; border-radius: 8px; cursor: pointer; }
    .btn:disabled { opacity: 0.6; cursor: default; }
    .hint { margin-top: 8px; font-size: 12px; color: #6b7280; text-align: center; }
  `]
})
export class LoginComponent implements OnInit {
  loading = false;
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // PUBLIC_INTERFACE
  onSubmit() {
    /** Submits credentials to backend via AuthService */
    if (this.form.invalid) return;
    this.loading = true;
    this.auth.login(this.form.value as any).subscribe({
      next: () => { this.loading = false; },
      error: () => { this.loading = false; },
    });
  }
}
