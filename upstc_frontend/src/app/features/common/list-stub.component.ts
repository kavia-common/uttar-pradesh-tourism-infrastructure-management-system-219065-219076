import { Component, Input } from '@angular/core';
import { TableComponent } from '../../shared/table/table.component';

@Component({
  selector: 'app-list-stub',
  standalone: true,
  imports: [TableComponent],
  template: `
    <h2>{{title}}</h2>
    <app-table [columns]="[{field:'id', header:'ID'}, {field:'name', header:'Name'}]"
               [data]="[{id: '1', name: title + ' A'}, {id: '2', name: title + ' B'}]"></app-table>
  `
})
export class ListStubComponent {
  @Input() title = 'List';
}
