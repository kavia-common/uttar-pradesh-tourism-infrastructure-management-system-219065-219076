import { ActivatedRouteSnapshot, CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

// PUBLIC_INTERFACE
export const RoleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  /**
   * Guard that checks route.data['roles'] for allowed roles.
   */
  const auth = inject(AuthService);
  const router = inject(Router);

  const allowed: string[] = route.data?.['roles'] || [];
  if (!auth.isAuthenticated()) {
    return router.parseUrl('/auth/login');
  }
  if (allowed.length === 0 || auth.hasRole(allowed)) {
    return true;
  }
  return router.parseUrl('/dashboard');
};
