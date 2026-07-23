import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AiService } from '../../core/services/ai.service';
import type { AiAnalysis } from '../../core/models';

@Component({
  selector: 'app-ai-estimation',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './ai-estimation.html',
})
export class AiEstimation implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly aiService = inject(AiService);
  protected readonly route = inject(ActivatedRoute);
  private readonly projectId = +this.route.snapshot.params['id'];

  readonly form = this.fb.nonNullable.group({
    prompt: ['', [Validators.required, Validators.minLength(20)]],
  });

  analyses: AiAnalysis[] = [];
  loading = false;
  error = '';

  ngOnInit() {
    this.aiService.getAnalyses(this.projectId).subscribe((a) => (this.analyses = a));
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';
    this.aiService.estimate(this.projectId, this.form.getRawValue().prompt).subscribe({
      next: (analysis) => {
        this.analyses = [analysis, ...this.analyses];
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
