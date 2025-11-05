import { Component, Input } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
  <table class="tbl" *ngIf="columns?.length">
    <thead>
      <tr>
        <th *ngFor="let col of columns">{{ col.header }}</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let row of data">
        <td *ngFor="let col of columns">{{ row[col.field] }}</td>
      </tr>
    </tbody>
  </table>
  `,
  styles: [`
    .tbl { width: 100%; border-collapse: collapse; }
    th, td { border-bottom: 1px solid #e5e7eb; padding: 8px; text-align: left; }
    th { background: #f3f4f6; color: #111827; }
  `]
})
export class TableComponent {
  @Input() columns: { field: string, header: string }[] = [];
  @Input() data: any[] = [];
}
