import { Injectable, signal } from '@angular/core';

export interface Toast {
  message: string;
  type: 'success' | 'error';
  id: number;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {
  readonly toasts = signal<Toast[]>([]);
  private nextId = 0;

  show(message: string, type: 'success' | 'error', duration = 4000) {
    const id = this.nextId++;
    this.toasts.update(t => [...t, { message, type, id }]);
    setTimeout(() => this.toasts.update(t => t.filter(toast => toast.id !== id)), duration);
  }

  success(message: string) { this.show(message, 'success'); }
  error(message: string) { this.show(message, 'error'); }
}
