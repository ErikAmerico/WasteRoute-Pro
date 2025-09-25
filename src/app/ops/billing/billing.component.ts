import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type Line = {
  date: string;
  route: string;
  customer: string;
  service: string;
  qty: number;
  rate: number;
  total: number;
};

@Component({
  selector: 'ops-billing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './billing.component.html',
  styleUrl: './billing.component.scss',
})
export class BillingComponent {
  cols = ['date', 'route', 'customer', 'service', 'qty', 'rate', 'total'] as const;

  readonly lines = signal<Line[]>([
    {
      date: '2025-09-22',
      route: 'RT-001',
      customer: 'Walmart Inc.',
      service: 'Front End Load (6yd)',
      qty: 1,
      rate: 180,
      total: 180,
    },
    {
      date: '2025-09-22',
      route: 'RT-002',
      customer: 'Office Complex A',
      service: 'Rear End Load',
      qty: 2,
      rate: 120,
      total: 240,
    },
    {
      date: '2025-09-22',
      route: 'RT-003',
      customer: 'Construction Co.',
      service: 'Roll-off Exchange',
      qty: 1,
      rate: 350,
      total: 350,
    },
  ]);
}
