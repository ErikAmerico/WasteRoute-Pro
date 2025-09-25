import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type DriverRow = {
  name: string;
  class: string;
  expiry: string;
  hos: string;
  status: 'Available' | 'On Route';
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './drivers.component.html',
})
export class DriversComponent {
  cols = ['name', 'class', 'expiry', 'hos', 'status', 'act'] as const;
  readonly rows = signal<DriverRow[]>([
    {
      name: 'John Smith',
      class: 'Class A',
      expiry: '03/15/2026',
      hos: '42 hrs',
      status: 'Available',
    },
    {
      name: 'Mike Johnson',
      class: 'Class B',
      expiry: '10/22/2025',
      hos: '38 hrs',
      status: 'On Route',
    },
  ]);
}
