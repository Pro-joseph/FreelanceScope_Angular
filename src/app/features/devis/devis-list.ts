import { afterNextRender, Component, inject, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DevisService } from '../../core/services/devis.service';

interface DevisListItem {
  id: number;
  client?: { company_name?: string };
  project?: { name?: string };
  total_amount: number;
  status: string;
  created_at: string;
}

@Component({
  selector: 'app-devis-list',
  imports: [DatePipe],
  templateUrl: './devis-list.html',
})
export class DevisList {
  private readonly devisService = inject(DevisService);

  readonly devis = signal<DevisListItem[]>([]);

  constructor() {
    afterNextRender(() => {
      this.devisService.listAll().subscribe((res) => this.devis.set(res ?? []));
    });
  }
}