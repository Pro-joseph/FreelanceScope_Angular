import { Component, input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span [class]="badgeClass()" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
      {{ label() }}
    </span>
  `,
})
export class StatusBadge {
  readonly status = input<string>('');
  readonly label = input<string>('');

  readonly badgeClass = () => {
    const s = this.status();
    if (s === 'actif' || s === 'accepted' || s === 'completed') return 'bg-green-100 text-green-700';
    if (s === 'inactif' || s === 'refused') return 'bg-red-100 text-red-700';
    if (s === 'draft') return 'bg-gray-100 text-gray-700';
    if (s === 'sent') return 'bg-blue-100 text-blue-700';
    return 'bg-gray-100 text-gray-700';
  };
}
