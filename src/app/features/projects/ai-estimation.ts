import { afterNextRender, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
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
  private readonly router = inject(Router);
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
      next: () => {
        this.form.reset();
        this.waitForAnalysis();
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de l'estimation IA";
        this.loading = false;
      },
    });
  }

  private waitForAnalysis() {
    const initialCount = this.analyses().length;
    let attempts = 0;

    const check = () => {
      attempts++;
      this.aiService.getAnalyses(this.projectId).subscribe((a) => {
        this.analyses.set(a);
        if (a.length > initialCount || attempts >= 30) {
          this.loading = false;
          this.router.navigate(['/projects', this.projectId]);
          return;
        }
        setTimeout(check, 3000);
      });
    };

    setTimeout(check, 3000);
  }
}
