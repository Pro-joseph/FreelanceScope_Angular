# FreelanceScope — Angular Frontend

Application de gestion pour freelances : clients, projets, estimation IA, devis PDF.

**Stack :** Angular 22+ · Standalone components · Signals · Tailwind CSS · Vitest

---

## Démarrage rapide (Docker)

```bash
docker-compose up -d
```

L'application est servie sur `http://localhost:4000` avec proxy API vers `http://localhost:80/api`.

---

## Installation locale

```bash
npm install
ng serve
```

Ouvrir `http://localhost:4200/`. Le proxy API est configuré dans `angular.json` (proxy vers `http://localhost:8000/api`).

---

## Build

```bash
ng build
```

Les artefacts sont dans `dist/`.

---

## Structure du projet

```
src/app/
├── core/
│   ├── models/          Interfaces TypeScript (User, Client, Project, ProjectFeature, Estimate, Devis, AiAnalysis)
│   ├── services/        ClientService, ProjectService, AuthService, DevisService, AiService, DashboardService
│   ├── guards/          auth.guard, role.guard
│   └── interceptors/    Sanctum token interceptor
├── features/
│   ├── auth/            Login, Register, Forgot / Reset password
│   ├── dashboard/       Tableau de bord freelance
│   ├── clients/         Liste, formulaire, détail
│   ├── projects/        Liste, formulaire, détail, features, estimation IA
│   ├── devis/           Génération, édition, aperçu
│   └── admin/           Gestion des freelances (admin)
└── shared/
    └── components/      Status badges, tags, etc.
```

---

## Pages

| Route | Page | Accès |
|-------|------|-------|
| `/login` | Connexion | public |
| `/register` | Inscription | public |
| `/forgot-password` | Mot de passe oublié | public |
| `/reset-password/:token` | Nouveau mot de passe | public |
| `/dashboard` | Tableau de bord | freelance |
| `/profile` | Mon profil | freelance |
| `/clients` | Liste clients | freelance |
| `/clients/new` | Nouveau client | freelance |
| `/clients/:id` | Détail client | freelance |
| `/clients/:id/edit` | Modifier client | freelance |
| `/projects` | Liste projets | freelance |
| `/projects/new` | Nouveau projet | freelance |
| `/projects/:id` | Détail projet | freelance |
| `/projects/:id/edit` | Modifier projet | freelance |
| `/projects/:id/ai-estimation` | Estimation IA | freelance |
| `/projects/:id/features/:featureId/edit` | Modifier fonctionnalité | freelance |
| `/projects/:id/devis/new` | Générer devis | freelance |
| `/projects/:id/devis/:devisId` | Aperçu devis | freelance |
| `/projects/:id/devis/:devisId/edit` | Modifier devis | freelance |
| `/admin/freelances` | Liste freelances | admin |
| `/admin/freelances/:id/edit` | Modifier freelance | admin |

---

## Tests

```bash
ng test
```

Tests unitaires avec Vitest.

---

## Documentation complète

- [Spécification Angular](spec/FreelanceScope_Angular_Spec.md)
- [Postman collection](spec/FreelanceScope.postman_collection.json)
