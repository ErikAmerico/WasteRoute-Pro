import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type RouteRow = { code: string; driver: string; truck: string; status: 'Active' | 'Delayed' };

@Component({
  selector: 'ops-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatTableModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  cols = ['code', 'driver', 'truck', 'status'] as const;
  readonly routes = signal<RouteRow[]>([
    { code: 'RT-001', driver: 'John Smith', truck: 'FL-102', status: 'Active' },
    { code: 'RT-002', driver: 'Mike Johnson', truck: 'RL-205', status: 'Delayed' },
    { code: 'RT-003', driver: 'Sarah Davis', truck: 'ASL-301', status: 'Active' },
  ]);
  readonly queue = signal([
    { title: 'Priority: Walmart Store #234', subtitle: 'Timed Stop 10:00 AM' },
    { title: 'New Request: Office Complex A', subtitle: 'Roll-off Container' },
  ]);
}
