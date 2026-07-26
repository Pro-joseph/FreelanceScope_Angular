import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DevisService } from '../../core/services/devis.service';
import type { Devis } from '../../core/models';

@Component({
  selector: 'app-devis-preview',
  imports: [RouterLink],
  templateUrl: './devis-preview.html',
})
export class DevisPreview {
  private readonly route = inject(ActivatedRoute);
  private readonly devisService = inject(DevisService);

  protected readonly projectId = +this.route.snapshot.params['id'];
  protected readonly devisId = +this.route.snapshot.params['devisId'];

  readonly devis = signal<Devis | null>(null);

  constructor() {
    afterNextRender(() => {
      this.devisService.get(this.projectId, this.devisId).subscribe((d) => this.devis.set(d));
    });
  }

  downloadPdf() {
    this.devisService.downloadPdf(this.projectId, this.devisId).subscribe((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `devis-${this.devisId}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
}
