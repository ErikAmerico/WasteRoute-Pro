import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatButtonModule],
  templateUrl: './service-queue.component.html',
})
export class ServiceQueueComponent {
  readonly requests = signal([
    {
      level: 'Priority',
      color: '#d32f2f',
      title: 'Walmart Store #234',
      service: 'Front End Load',
      note: 'Timed 10:00 AM',
    },
    {
      level: 'Standard',
      color: '#f59e0b',
      title: 'Office Complex A',
      service: 'Roll-off Exchange',
      note: 'Flexible timing',
    },
    {
      level: 'New Request',
      color: '#22c55e',
      title: 'Restaurant Row',
      service: 'Rear End Load',
      note: 'Tomorrow AM',
    },
  ]);
}
