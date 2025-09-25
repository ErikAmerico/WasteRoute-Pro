import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TitleCasePipe } from '@angular/common';

type ServiceType = 'rolloff' | 'commercial' | 'residential' | 'special';
type Container = '2yd' | '4yd' | '6yd' | '8yd' | '20yd-rolloff' | '40yd-rolloff';

@Component({
  selector: 'ops-customer-portal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    TitleCasePipe,
  ],
  styleUrl: './customer-portal.component.scss',
  templateUrl: './customer-portal.component.html',
})
export class CustomerPortalComponent {
  // selections
  readonly service = signal<ServiceType>('rolloff');
  readonly container = signal<Container | null>(null);

  // Reactive form
  readonly form = new FormGroup({
    businessName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    address: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    window: new FormControl<'am' | 'mid' | 'pm'>('am', { nonNullable: true }),
  });

  // derived label
  readonly prettyContainer = computed(() => {
    switch (this.container()) {
      case '2yd':
        return '2 Yard';
      case '4yd':
        return '4 Yard';
      case '6yd':
        return '6 Yard';
      case '8yd':
        return '8 Yard';
      case '20yd-rolloff':
        return '20 Yard Roll-Off';
      case '40yd-rolloff':
        return '40 Yard Roll-Off';
      default:
        return '';
    }
  });

  selectService(t: ServiceType) {
    this.service.set(t);
  }
  selectContainer(c: Container) {
    this.container.set(c);
  }

  reset() {
    this.form.reset({ businessName: '', address: '', window: 'am' });
    this.container.set(null);
    this.service.set('rolloff');
  }

  submit() {
    if (!this.form.valid) return;

    const request = {
      type: this.service(),
      container: this.container(),
      details: this.form.getRawValue(),
    };

    // TODO: swap for HttpClient POST to your API endpoint
    console.log('Service Request:', request);
    alert('Request submitted! (check console)');
    this.reset();
  }
}
