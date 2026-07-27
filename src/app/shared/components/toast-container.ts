import { Component, inject } from '@angular/core';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-toast-container',
  templateUrl: './toast-container.html',
})
export class ToastContainer {
  readonly toasts = inject(NotificationService).toasts;
}
