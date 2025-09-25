import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type SiteRow = {
  name: string;
  type: string;
  addr: string;
  hours: string;
  materials: string;
  dist: string;
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './disposal.component.html',
})
export class DisposalComponent {
  cols = ['name', 'type', 'addr', 'hours', 'materials', 'dist', 'act'] as const;
  readonly rows = signal<SiteRow[]>([
    {
      name: 'Central Landfill',
      type: 'Landfill',
      addr: '1234 Disposal Rd',
      hours: '6AM - 6PM',
      materials: 'All types',
      dist: '12 miles',
    },
    {
      name: 'North Transfer Station',
      type: 'Transfer',
      addr: '5678 Transfer Ave',
      hours: '7AM - 5PM',
      materials: 'Municipal, Commercial',
      dist: '8 miles',
    },
    {
      name: 'Recycling Center A',
      type: 'Recycling',
      addr: '910 Green Way',
      hours: '8AM - 4PM',
      materials: 'Recyclables only',
      dist: '15 miles',
    },
  ]);
}
