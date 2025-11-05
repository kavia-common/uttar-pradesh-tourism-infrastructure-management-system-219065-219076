import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

// PUBLIC_INTERFACE
export const AuthGuard: CanActivateFn = () => {
  /** Guard that allows navigation only if authenticated */
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.isAuthenticated() ? true : router.parseUrl('/auth/login');
};
