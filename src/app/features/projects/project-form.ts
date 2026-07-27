import { afterNextRender, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../core/services/project.service';
import { ClientService } from '../../core/services/client.service';
import { NotificationService } from '../../shared/services/notification.service';
import type { Client } from '../../core/models';

@Component({
  selector: 'app-project-form',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './project-form.html',
})
export class ProjectForm {
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projectService = inject(ProjectService);
  private readonly clientService = inject(ClientService);
  private readonly notify = inject(NotificationService);

  readonly form = this.fb.nonNullable.group({
    client_id: [0, Validators.required],
    name: ['', Validators.required],
    description: [''],
    status: ['draft'],
  });

  readonly clients = signal<Client[]>([]);
  isEdit = false;
  error = '';

  constructor() {
    afterNextRender(() => {
      this.clientService.list().subscribe((c) => this.clients.set(c));
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      afterNextRender(() => {
        this.projectService.get(id).subscribe((project) => {
          this.form.patchValue(project);
          this.cdr.markForCheck();
        });
      });
    }

    const prefillClientId = this.route.snapshot.queryParams['client_id'];
    if (prefillClientId) {
      this.form.patchValue({ client_id: +prefillClientId });
    }
  }

  submit() {
    if (this.form.invalid) return;
    this.error = '';
    const data = this.form.getRawValue();
    const id = this.route.snapshot.params['id'];

    const request = this.isEdit
      ? this.projectService.update(id, data)
      : this.projectService.create(data);

    request.subscribe({
      next: (project) => {
        this.notify.success(this.isEdit ? 'Projet modifié' : 'Projet créé');
        this.router.navigate(['/projects', project.id]);
      },
      error: (err) => {
        this.error = err.error?.message || "Erreur lors de la sauvegarde du projet";
      },
    });
  }
}
