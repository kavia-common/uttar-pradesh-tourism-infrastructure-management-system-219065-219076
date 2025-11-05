import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListStubComponent } from './list-stub.component';

@Component({
  selector: 'app-list-route',
  standalone: true,
  imports: [ListStubComponent],
  template: `<app-list-stub [title]="title"></app-list-stub>`
})
export class ListRouteComponent {
  title = 'List';
  constructor(route: ActivatedRoute) {
    this.title = route.snapshot.data?.['title'] || 'List';
  }
}
