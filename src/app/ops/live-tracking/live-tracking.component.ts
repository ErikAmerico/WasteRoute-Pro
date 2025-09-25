import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

type TruckPos = {
  code: string;
  driver: string;
  status: 'Moving' | 'Stopped' | 'Idle';
  lat: number;
  lng: number;
  lastUpdate: string;
};

@Component({
  selector: 'ops-live-tracking',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './live-tracking.component.html',
})
export class LiveTrackingComponent {
  cols = ['code', 'driver', 'status', 'last'] as const;

  readonly rows = signal<TruckPos[]>([
    {
      code: 'FL-102',
      driver: 'John Smith',
      status: 'Moving',
      lat: 40.71,
      lng: -74.0,
      lastUpdate: '1 min ago',
    },
    {
      code: 'RO-205',
      driver: 'Mike Jones',
      status: 'Idle',
      lat: 40.7,
      lng: -73.9,
      lastUpdate: '3 mins ago',
    },
    {
      code: 'ASL-301',
      driver: 'Sarah Davis',
      status: 'Stopped',
      lat: 40.69,
      lng: -73.95,
      lastUpdate: '5 mins ago',
    },
  ]);

  refresh() {
    // Replace with WebSocket pull or HTTP poll later
    this.rows.update((list) => [...list]);
  }
}
