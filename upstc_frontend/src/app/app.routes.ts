import { Routes } from '@angular/router';
import { AuthGuard } from './features/auth/guards/auth.guard';
import { RoleGuard } from './features/auth/guards/role.guard';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'auth/login', loadComponent: () => import('./features/auth/components/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'users', canActivate: [RoleGuard], data: { title: 'Users', roles: ['ADMIN'] }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'projects', data: { title: 'Projects' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'tenders', data: { title: 'Tenders' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'contractors', data: { title: 'Contractors' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'funds', data: { title: 'Funds' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'milestones', data: { title: 'Milestones' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'inspections', data: { title: 'Inspections' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'handover', data: { title: 'Handover' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'payments', data: { title: 'Payments' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'reports', data: { title: 'Reports' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
      { path: 'training', data: { title: 'Training' }, loadComponent: () => import('./features/common/list-route.component').then(m => m.ListRouteComponent) },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
