import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import type { User } from '../../core/models';

@Component({
  selector: 'app-freelance-list',
  imports: [RouterLink],
  templateUrl: './freelance-list.html',
})
export class FreelanceList implements OnInit {
  private readonly http = inject(HttpClient);

  freelances: User[] = [];

  ngOnInit() {
    this.http
      .get<User[]>(`${environment.apiUrl}/admin/freelances`)
      .subscribe((f) => (this.freelances = f));
  }
}
