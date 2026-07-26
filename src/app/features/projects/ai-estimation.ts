import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import type { AiAnalysis } from '../../core/models';

@Component({
  selector: 'app-ai-estimation',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './ai-estimation.html',
})
export class AiEstimation {
  private readonly fb = inject(FormBuilder);
  private readonly aiService = inject(AiService);
  protected readonly route = inject(ActivatedRoute);
  private readonly projectId = +this.route.snapshot.params['id'];

  readonly form = this.fb.nonNullable.group({
    prompt: ['', [Validators.required, Validators.minLength(20)]],
  });

  readonly analyses = signal<AiAnalysis[]>([]);
  loading = false;
  error = '';

  constructor() {
    afterNextRender(() => {
      this.aiService.getAnalyses(this.projectId).subscribe((a) => this.analyses.set(a));
    });
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.aiService.estimate(this.projectId, this.form.getRawValue().prompt).subscribe({
      next: (analysis) => {
        this.analyses.update((prev) => [analysis, ...prev]);
        this.form.reset();
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de l'estimation IA";
        this.loading = false;
      },
    });
  }
}
