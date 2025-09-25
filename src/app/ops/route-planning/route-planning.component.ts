import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; // date adapter
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

type Stop = {
  id: string;
  name: string;
  kind: 'timed' | 'normal' | 'final';
  note: string; // e.g. "Timed Stop: 10:00 AM | Container: Front End Load"
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
  ],
  styleUrl: './route-planning.component.scss',
  templateUrl: './route-planning.component.html',
})
export class RoutePlanningComponent {
  readonly form = new FormGroup({
    date: new FormControl<Date | null>(new Date()),
    driver: new FormControl<string>('d1'),
    truck: new FormControl<string>('t1'),
  });

  readonly drivers = signal([
    { id: 'd1', name: 'John Smith', hrs: 42 },
    { id: 'd2', name: 'Sarah Davis', hrs: 36 },
  ]);

  readonly trucks = signal([
    { id: 't1', code: 'RO-101', kind: 'Roll Off' },
    { id: 't2', code: 'FL-102', kind: 'Front End Load' },
  ]);

  // Mock stops matching your screenshot
  readonly scheduled = signal<Stop[]>([
    {
      id: 's1',
      name: 'Walmart Store #234',
      kind: 'timed',
      note: 'Timed Stop: 10:00 AM | Container: Front End Load',
    },
    {
      id: 's2',
      name: 'Office Complex A',
      kind: 'normal',
      note: 'Distance: 2.3 miles | Container: Rear End Load',
    },
    {
      id: 's3',
      name: 'Construction Site B',
      kind: 'normal',
      note: 'Distance: 4.1 miles | Container: Roll Off',
    },
    {
      id: 'final',
      name: 'Central Landfill',
      kind: 'final',
      note: 'Disposal Site | Distance: 12 miles',
    },
  ]);

  optimize() {
    // Later: call your optimizer and update `scheduled.set(newStops)`
    alert('Pretend we called OR-Tools and drew a route.');
  }
}
