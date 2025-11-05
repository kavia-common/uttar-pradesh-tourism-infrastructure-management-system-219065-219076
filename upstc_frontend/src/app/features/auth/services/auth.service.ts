import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiClient } from '../../../services/api-client.service';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { User } from '../../../models/user.model';

const TOKEN_KEY = 'upstdc_token';
const USER_KEY = 'upstdc_user';

function storageAvailable(): boolean {
  return typeof globalThis !== 'undefined' && !!(globalThis as any).localStorage;
}
function getFromStorage(key: string): string | null {
  if (!storageAvailable()) return null;
  try { return (globalThis as any).localStorage.getItem(key); } catch { return null; }
}
function setToStorage(key: string, value: string) {
  if (!storageAvailable()) return;
  try { (globalThis as any).localStorage.setItem(key, value); } catch {}
}
function removeFromStorage(key: string) {
  if (!storageAvailable()) return;
  try { (globalThis as any).localStorage.removeItem(key); } catch {}
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user$ = new BehaviorSubject<User | null>(this.loadUser());

  constructor(private api: ApiClient, private router: Router) {}

  private loadUser(): User | null {
    const raw = getFromStorage(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  }

  private persist(user: User | null, token?: string) {
    if (user) {
      setToStorage(USER_KEY, JSON.stringify(user));
    } else {
      removeFromStorage(USER_KEY);
    }
    if (token !== undefined) {
      if (token) setToStorage(TOKEN_KEY, token);
      else removeFromStorage(TOKEN_KEY);
    }
  }

  // PUBLIC_INTERFACE
  login(credentials: { email: string; password: string }): Observable<User> {
    /**
     * Calls backend to authenticate and stores token and user in localStorage.
     * Expected backend response shape: { user: User, token: string }
     */
    return this.api.post<{ user: User; token: string }>('/auth/login', credentials).pipe(
      map(res => {
        const user = { ...res.user, token: res.token };
        this.persist(user, res.token);
        this.user$.next(user);
        return user;
      }),
      tap(() => this.router.navigateByUrl('/dashboard'))
    );
  }

  // PUBLIC_INTERFACE
  logout() {
    /** Clears auth state and navigates to login */
    this.persist(null, '');
    this.user$.next(null);
    this.router.navigateByUrl('/auth/login');
  }

  // PUBLIC_INTERFACE
  isAuthenticated(): boolean {
    /** Returns whether a token exists */
    return !!getFromStorage(TOKEN_KEY);
  }

  // PUBLIC_INTERFACE
  getToken(): string | null {
    /** Retrieves JWT token from localStorage */
    return getFromStorage(TOKEN_KEY);
  }

  // PUBLIC_INTERFACE
  currentUser(): User | null {
    /** Gets current user object */
    return this.user$.value;
  }

  // PUBLIC_INTERFACE
  hasRole(roles: string[]): boolean {
    /** Checks whether current user has any of the given roles */
    const u = this.currentUser();
    if (!u) return false;
    return roles.includes(u.role as string);
  }
}
