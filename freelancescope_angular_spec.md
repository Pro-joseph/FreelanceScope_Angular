# FreelanceScope — Angular ↔ Laravel API Connection Spec

## Architecture

| Layer | Technology | Port |
|---|---|---|
| Frontend | Angular 22 + SSR | `http://localhost:4200` |
| Backend | Laravel 13 + Sanctum | `http://localhost` |
| API base | `http://localhost/api` | — |

## CORS

Configured in `FreelanceScope_Laravel/config/cors.php`:
```php
'allowed_origins' => [env('FRONTEND_URL', 'http://localhost:4200')],
'supports_credentials' => true,
```

Set in `.env`: `FRONTEND_URL=http://localhost:4200`

## Authentication Flow

1. **Login/Register** → receive `{ token, user }` from API
2. Token stored in `localStorage` key `auth_token`
3. `sanctum-token.interceptor.ts` auto-attaches `Authorization: Bearer {token}` to every request
4. **Logout** → revokes current Sanctum token

## API Route Map

### Public Auth — `/api/auth`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| POST | `/api/auth/login` | `AuthService.login()` | `ApiAuthController@login` |
| POST | `/api/auth/register` | `AuthService.register()` | `ApiAuthController@register` |
| POST | `/api/auth/forgot-password` | `AuthService.forgotPassword()` | `ApiAuthController@forgotPassword` |
| POST | `/api/auth/reset-password` | `AuthService.resetPassword()` | `ApiAuthController@resetPassword` |

### Authenticated Auth — `/api/auth`

| Method | Endpoint | Angular Service | Laravel Handler |
|---|---|---|---|
| GET | `/api/auth/me` | `AuthService.me()` | Closure returning `$request->user()` |
| POST | `/api/auth/logout` | `AuthService.logout()` | `ApiAuthController@logout` |

### Clients — `/api/clients`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/clients` | `ClientService.list()` | `ClientController@index` |
| POST | `/api/clients` | `ClientService.create()` | `ClientController@store` |
| GET | `/api/clients/{client}` | `ClientService.get()` | `ClientController@show` |
| PUT | `/api/clients/{client}` | `ClientService.update()` | `ClientController@update` |
| DELETE | `/api/clients/{client}` | `ClientService.delete()` | `ClientController@destroy` |

### Projects — `/api/projects`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/projects` | `ProjectService.list()` | `ProjectController@index` |
| POST | `/api/projects` | `ProjectService.create()` | `ProjectController@store` |
| GET | `/api/projects/{project}` | `ProjectService.get()` | `ProjectController@show` |
| PUT | `/api/projects/{project}` | `ProjectService.update()` | `ProjectController@update` |
| DELETE | `/api/projects/{project}` | `ProjectService.delete()` | `ProjectController@destroy` |

### Project Features — `/api/projects/{project}/features`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/projects/{project}/features` | `ProjectService.getFeatures()` | `ProjectFeatureController@index` |
| POST | `/api/projects/{project}/features` | — | `ProjectFeatureController@store` |
| PUT | `/api/projects/{project}/features/{feature}` | `ProjectService.updateFeature()` | `ProjectFeatureController@update` |

### Estimates — `/api/features/{feature}/estimate`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/features/{feature}/estimate` | — | `EstimateController@show` |
| PUT | `/api/estimates/{estimate}` | — | `EstimateController@update` |

### AI Estimation & Analyses — `/api/projects/{project}`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| POST | `/api/projects/{project}/ai-estimate` | `AiService.estimate()` | `AIController` (invokable) |
| GET | `/api/projects/{project}/ai-analyses` | `AiService.getAnalyses()` | `AIController@analyses` |

### Devis (nested under projects) — `/api/projects/{project}/devis`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/projects/{project}/devis` | `DevisService.list()` | `DevisController@index` |
| POST | `/api/projects/{project}/devis` | `DevisService.generate()` | `DevisController@store` |
| GET | `/api/projects/{project}/devis/{devis}` | `DevisService.get()` | `DevisController@show` |
| PUT | `/api/projects/{project}/devis/{devis}` | `DevisService.update()` | `DevisController@update` |
| DELETE | `/api/projects/{project}/devis/{devis}` | — | `DevisController@destroy` |
| GET | `/api/projects/{project}/devis/{devis}/pdf` | `DevisService.downloadPdf()` | `DevisController@download` |

### Dashboard — `/api/dashboard`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/dashboard/stats` | `DashboardService.stats()` | `FreelanceController@dashboard` |

### Freelance Profile — `/api/freelance`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/freelance/profile` | — | `FreelanceController@profile` |
| PUT | `/api/freelance/profile` | — | `FreelanceController@updateProfile` |
| GET | `/api/freelance/dashboard` | — | `FreelanceController@dashboard` |

### Admin — `/api/admin`

| Method | Endpoint | Angular Service | Laravel Controller |
|---|---|---|---|
| GET | `/api/admin/dashboard` | — | `AdminController@dashboard` |
| GET | `/api/admin/freelances` | — | `AdminController@freelances` |
| POST | `/api/admin/freelances` | — | `AdminController@storeFreelance` |
| PUT | `/api/admin/freelances/{user}` | — | `AdminController@updateFreelance` |
| PATCH | `/api/admin/freelances/{user}/statut` | — | `AdminController@toggleStatut` |
| DELETE | `/api/admin/freelances/{user}` | — | `AdminController@destroyFreelance` |

## Total Endpoints

**41 API routes** registered — all routes that Angular services call are now connected.

## Known Integration Notes

### Response Format (API Resources)
Laravel API Resources wrap responses in `{ data: ... }`. Angular services expect the raw data. Example:
- Laravel returns: `{ data: { id: 1, name: "..." } }`
- Angular expects: `{ id: 1, name: "..." }` (call via `HttpClient.get<Client>()`)
- **For collections**: Angular calls `HttpClient.get<Client[]>()` but gets `{ data: [...] }`

This may require either:
- Adjusting Angular services to unwrap `data` (e.g., `this.http.get<{data: Client[]}>()`)
- Or configuring Laravel to use `JsonResource::withoutWrapping()`

### Devis Create — Missing Fields
`DevisService.generate(projectId, conditions?)` sends `POST /api/projects/{projectId}/devis` with body `{ conditions }`. However, `StoreDevisRequest` requires `client_id` and `project_id` in the request body. The Angular form (`devis-generate.ts`) currently has no client selector. Suggested fix: add `project_id` inference in the backend or add a client dropdown in the form.

### Feature Update — Extra URL Param
`PUT /api/projects/{project}/features/{feature}` passes both route params. The controller method `update(UpdateProjectFeatureRequest $request, ProjectFeature $feature)` receives only `$request` and `$feature` — the `$project` param is silently ignored by Laravel. Functionally correct.

### Feature Create
`POST /api/projects/{project}/features` routes to `ProjectFeatureController@store(StoreProjectFeatureRequest $request, Project $project)` — fully compatible.

### AI Estimate Response
Angular `AiService.estimate()` expects `AiAnalysis` back, but `AIController` returns `{ message: "Estimation en cours de génération." }` with status 202 (async job). The Angular component should handle the async nature (polling or redirect).