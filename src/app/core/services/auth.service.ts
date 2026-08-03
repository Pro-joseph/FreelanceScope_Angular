import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { finalize, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import type { User } from '../models';

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const isBrowser = typeof localStorage !== 'undefined';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/auth`;
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  readonly user = signal<User | null>(isBrowser ? this.getStoredUser() : null);
  readonly isAuthenticated = signal(isBrowser && !!localStorage.getItem('auth_token'));
  private checked = false;

  async init() {
    if (!isBrowser || this.checked) return;
    this.checked = true;

    if (!this.isAuthenticated()) return;

    try {
      const user = await this.http.get<User>(`${this.apiUrl}/me`).toPromise();
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
        this.isAuthenticated.set(true);
      }
    } catch {
      this.clearSession();
    }
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
      tap((res) => {
        if (!isBrowser) return;
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user.set(res.user);
        this.isAuthenticated.set(true);
      }),
    );
  }

  register(data: RegisterData) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/register`, data).pipe(
      tap((res) => {
        if (!isBrowser) return;
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.user.set(res.user);
        this.isAuthenticated.set(true);
      }),
    );
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.apiUrl}/forgot-password`, { email });
  }

  resetPassword(token: string, password: string, passwordConfirmation: string) {
    return this.http.post(`${this.apiUrl}/reset-password`, {
      token,
      password,
      password_confirmation: passwordConfirmation,
    });
  }

  me() {
    return this.http.get<User>(`${this.apiUrl}/me`).pipe(
      tap((user) => {
        if (!isBrowser) return;
        localStorage.setItem('user', JSON.stringify(user));
        this.user.set(user);
      }),
    );
  }

  authorizeTelescope() {
    return this.http.post(`${environment.apiUrl}/admin/telescope/authorize`, {});
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      finalize(() => this.clearSession()),
    );
  }

  clearSession() {
    if (!isBrowser) return;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.user.set(null);
    this.isAuthenticated.set(false);
    this.router.navigate(['/login']);
  }

  private getStoredUser(): User | null {
    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch {
      return null;
    }
  }
}
