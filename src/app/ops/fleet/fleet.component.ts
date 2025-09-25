import { Component, ChangeDetectionStrategy, signal } from '@angular/core';

type Metric = {
  label: string;
  current: string | number;
  previous?: string | number;
  change?: string;
  changeGood?: boolean;
};

@Component({
  selector: 'ops-fleet',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fleet.component.html',
})
export class FleetComponent {
  readonly totals = signal({
    fleet: 25,
    active: 18,
    maintenance: 4,
    fuel: '8,234',
    utilization: '72%',
  });

  readonly metrics = signal<Metric[]>([
    {
      label: 'Total Miles Driven',
      current: 12450,
      previous: 11890,
      change: '+4.7%',
      changeGood: false,
    },
    {
      label: 'Fuel Efficiency (MPG)',
      current: 6.8,
      previous: 6.5,
      change: '+4.6%',
      changeGood: true,
    },
    { label: 'Maintenance Hours', current: 48, previous: 52, change: '-7.7%', changeGood: true },
    { label: 'Incidents/Breakdowns', current: 1, previous: 3, change: '-66.7%', changeGood: true },
  ]);
}
