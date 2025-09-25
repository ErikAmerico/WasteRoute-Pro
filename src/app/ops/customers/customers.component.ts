import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type Row = {
  customer: string;
  sites: string;
  services: string;
  type: string;
  status: 'Active' | 'Pending';
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTabsModule, MatTableModule, MatButtonModule],
  templateUrl: './customer-portal.component.html',
})
export class CustomersComponent {
  cols = ['customer', 'sites', 'services', 'type', 'status', 'actions'] as const;
  readonly rows = signal<Row[]>([
    {
      customer: 'Walmart Inc.',
      sites: '12 sites',
      services: 'Weekly',
      type: 'Front End Load',
      status: 'Active',
    },
    {
      customer: 'Office Complex A',
      sites: '3 sites',
      services: 'Bi-weekly',
      type: 'Rear End Load',
      status: 'Active',
    },
    {
      customer: 'Construction Co.',
      sites: '5 sites',
      services: 'On-demand',
      type: 'Roll Off',
      status: 'Pending',
    },
  ]);
}
