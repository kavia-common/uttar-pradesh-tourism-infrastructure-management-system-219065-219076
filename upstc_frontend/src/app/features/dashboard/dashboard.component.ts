import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  template: `
    <div>
      <h2>Dashboard</h2>
      <p>Welcome to UPSTDC project monitoring dashboard.</p>
      <div class="stats">
        <div class="card">Projects</div>
        <div class="card">Tenders</div>
        <div class="card">Payments</div>
      </div>
    </div>
  `,
  styles: [`
    .stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 12px; }
    .card { background: #fff; border: 1px solid #e5e7eb; border-radius: 10px; padding: 16px; }
  `]
})
export class DashboardComponent {}
