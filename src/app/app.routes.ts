import { Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'ops', pathMatch: 'full' },
  //delete notes below (and its component files under app/_notes) once everyone has an understanding of the project
  {
    path: 'notes',
    loadComponent: () => import('./_notes/notes.component').then((m) => m.NotesComponent),
  },
  //delete notes above (and its component files under app/_notes) once everyone has an understanding of the project
  {
    path: 'ops',
    canActivate: [authGuard(['dispatcher', 'billing', 'admin'])],
    loadComponent: () => import('./ops/ops-shell.component').then((m) => m.OpsShellComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./ops/dashboard/dashboard.component').then((m) => m.DashboardComponent),
      },
      {
        path: 'customers',
        loadComponent: () =>
          import('./ops/customers/customers.component').then((m) => m.CustomersComponent),
      },
      {
        path: 'drivers',
        loadComponent: () =>
          import('./ops/drivers/drivers.component').then((m) => m.DriversComponent),
      },
      {
        path: 'fleet',
        loadComponent: () => import('./ops/fleet/fleet.component').then((m) => m.FleetComponent),
      },
      {
        path: 'disposal',
        loadComponent: () =>
          import('./ops/disposal/disposal.component').then((m) => m.DisposalComponent),
      },
      {
        path: 'route-planning',
        loadComponent: () =>
          import('./ops/route-planning/route-planning.component').then(
            (m) => m.RoutePlanningComponent
          ),
      },
      {
        path: 'service-queue',
        loadComponent: () =>
          import('./ops/service-queue/service-queue.component').then(
            (m) => m.ServiceQueueComponent
          ),
      },
      {
        path: 'schedule',
        loadComponent: () =>
          import('./ops/schedule/schedule.component').then((m) => m.ScheduleComponent),
      },
      {
        path: 'live-tracking',
        loadComponent: () =>
          import('./ops/live-tracking/live-tracking.component').then(
            (m) => m.LiveTrackingComponent
          ),
      },
      {
        path: 'billing',
        loadComponent: () =>
          import('./ops/billing/billing.component').then((m) => m.BillingComponent),
      },
      {
        path: 'customer-portal',
        loadComponent: () =>
          import('./ops/customer-portal/customer-portal.component').then(
            (m) => m.CustomerPortalComponent
          ),
      },
    ],
  },

  { path: '**', redirectTo: 'ops' },
];
