import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

type DayRow = {
  day: string;
  routes: number;
  drivers: string;
  stops: number;
  status: 'Completed' | 'In Progress' | 'Scheduled';
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule],
  templateUrl: './schedule.component.html',
})
export class ScheduleComponent {
  cols = ['day', 'routes', 'drivers', 'stops', 'status'] as const;
  readonly rows = signal<DayRow[]>([
    { day: 'Monday', routes: 12, drivers: '12/15', stops: 156, status: 'Completed' },
    { day: 'Tuesday', routes: 14, drivers: '14/15', stops: 178, status: 'Completed' },
    { day: 'Wednesday', routes: 13, drivers: '13/15', stops: 165, status: 'In Progress' },
    { day: 'Thursday', routes: 15, drivers: '14/15', stops: 189, status: 'Scheduled' },
    { day: 'Friday', routes: 16, drivers: '15/15', stops: 201, status: 'Scheduled' },
  ]);
}
