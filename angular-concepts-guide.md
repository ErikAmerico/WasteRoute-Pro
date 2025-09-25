# Angular Core Concepts Guide

This guide explains the key Angular imports and concepts used in the WRP project.

## Table of Contents
1. [Core Angular Imports](#core-angular-imports)
2. [Component Configuration](#component-configuration)
3. [Reactive Forms Imports](#reactive-forms-imports)

---

## Core Angular Imports

### `import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';`

#### `Component`
**What it is:** A decorator that marks a class as an Angular component.

**How it works:** 
- Transforms a TypeScript class into an Angular component
- Provides metadata about the component (template, styles, selector, etc.)
- Enables dependency injection and lifecycle hooks

**Example:**
```typescript
@Component({
  selector: 'app-user-profile',
  template: '<div>{{ user.name }}</div>',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = { name: 'John Doe' };
}
```

**In WRP context:** Used in all component files like `dashboard.component.ts`, `drivers.component.ts`, etc.

---

#### `ChangeDetectionStrategy`
**What it is:** An enum that defines how Angular should detect changes in a component.

**Available strategies:**
- `Default`: Angular checks all components on every change detection cycle
- `OnPush`: Angular only checks the component when:
  - Input properties change
  - An event is emitted
  - An observable emits a new value
  - Change detection is manually triggered

**How it works:**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyComponent {
  // Component will only update when inputs change or events occur
}
```

**Benefits of OnPush:**
- **Performance**: Reduces unnecessary change detection cycles
- **Predictability**: Component only updates when explicitly needed
- **Scalability**: Better performance in large applications

**Example in WRP:**
```typescript
@Component({
  selector: 'ops-shell',
  changeDetection: ChangeDetectionStrategy.OnPush, // Only update when needed
  // ... other config
})
export class OpsShellComponent {}
```

---

#### `computed`
**What it is:** A function that creates a computed signal - a reactive value derived from other signals.

**How it works:**
- Automatically recalculates when dependent signals change
- Caches the result until dependencies change
- Provides reactive, derived state

**Example:**
```typescript
@Component({
  template: `
    <div>Total: {{ total() }}</div>
    <div>Average: {{ average() }}</div>
  `
})
export class CalculatorComponent {
  // Source signals
  numbers = signal([1, 2, 3, 4, 5]);
  
  // Computed signals
  total = computed(() => 
    this.numbers().reduce((sum, num) => sum + num, 0)
  );
  
  average = computed(() => 
    this.total() / this.numbers().length
  );
}
```

**Benefits:**
- **Automatic updates**: Recalculates when dependencies change
- **Performance**: Only recalculates when needed
- **Clean code**: Declarative way to express derived state

**Real-world WRP example:**
```typescript
@Component({
  template: `
    <div>Active Drivers: {{ activeDriversCount() }}</div>
    <div>Completion Rate: {{ completionRate() }}%</div>
  `
})
export class DashboardComponent {
  drivers = signal<Driver[]>([]);
  completedRoutes = signal<Route[]>([]);
  
  // Computed values that automatically update
  activeDriversCount = computed(() => 
    this.drivers().filter(d => d.status === 'active').length
  );
  
  completionRate = computed(() => {
    const total = this.drivers().length;
    const completed = this.completedRoutes().length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  });
}
```

---

#### `signal`
**What it is:** A reactive primitive that holds a value and notifies consumers when it changes.

**How it works:**
- Creates reactive state that components can subscribe to
- Automatically triggers change detection when updated
- Provides a simple, powerful state management solution

**Basic usage:**
```typescript
@Component({
  template: '<div>{{ count() }}</div>'
})
export class CounterComponent {
  // Create a signal with initial value
  count = signal(0);
  
  increment() {
    // Update the signal
    this.count.update(current => current + 1);
  }
  
  reset() {
    // Set a new value
    this.count.set(0);
  }
}
```

**Signal methods:**
- `signal(value)`: Create with initial value
- `signal.set(newValue)`: Set new value
- `signal.update(fn)`: Update using current value
- `signal.asReadonly()`: Create read-only version

**Advanced WRP example:**
```typescript
@Component({
  template: `
    <div *ngFor="let driver of drivers()">
      {{ driver.name }} - {{ driver.status }}
    </div>
  `
})
export class DriversComponent {
  // Private writable signal
  private _drivers = signal<Driver[]>([]);
  
  // Public readonly signal
  drivers = this._drivers.asReadonly();
  
  // Update drivers from API
  loadDrivers() {
    this.driverService.getDrivers().subscribe(drivers => {
      this._drivers.set(drivers);
    });
  }
  
  // Update single driver
  updateDriverStatus(driverId: string, status: string) {
    this._drivers.update(drivers => 
      drivers.map(driver => 
        driver.id === driverId ? { ...driver, status } : driver
      )
    );
  }
}
```

---

## Component Configuration

### `changeDetection: ChangeDetectionStrategy.OnPush`

**What it does:** Tells Angular to use OnPush change detection strategy for this component.

**When to use:**
- Components with immutable data
- Components that only update on input changes
- Performance-critical components
- Components using signals or observables

**Example:**
```typescript
@Component({
  selector: 'app-user-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="user-card">
      <h3>{{ user().name }}</h3>
      <p>{{ user().email }}</p>
    </div>
  `
})
export class UserCardComponent {
  @Input() user = input<User>(); // Input signal
  
  // Component will only update when user input changes
}
```

---

### `host: { class: 'h-full' }`

**What it is:** Host binding that applies CSS classes to the component's host element.

**How it works:**
- Adds CSS classes to the component's root element
- Can bind to properties, attributes, classes, and styles
- Useful for component styling and layout

**Examples:**
```typescript
@Component({
  selector: 'app-sidebar',
  host: { 
    class: 'sidebar h-full', // Multiple classes
    '[class.collapsed]': 'isCollapsed', // Conditional class
    '[style.width.px]': 'width', // Style binding
    'role': 'navigation' // Attribute binding
  },
  template: '<ng-content></ng-content>'
})
export class SidebarComponent {
  isCollapsed = signal(false);
  width = signal(250);
}
```

**In WRP context:**
```typescript
@Component({
  selector: 'ops-shell',
  host: { class: 'h-full' }, // Makes the component take full height
  template: `
    <mat-sidenav-container class="h-full">
      <!-- Content -->
    </mat-sidenav-container>
  `
})
export class OpsShellComponent {}
```

**Common host bindings:**
```typescript
host: {
  class: 'my-component', // Static class
  '[class.active]': 'isActive', // Conditional class
  '[style.color]': 'textColor', // Style binding
  '[attr.aria-label]': 'label', // Attribute binding
  '(click)': 'onClick()', // Event binding
  '[tabindex]': '0' // Static attribute
}
```

---

## Reactive Forms Imports

### `import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';`

#### `ReactiveFormsModule`
**What it is:** An Angular module that provides reactive forms functionality.

**How it works:**
- Must be imported in the component or module where reactive forms are used
- Provides form directives like `formGroup`, `formControl`, `formArray`
- Enables programmatic form control and validation

**Usage:**
```typescript
@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule], // Import the module
  template: `
    <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
      <input formControlName="name" placeholder="Name">
      <input formControlName="email" placeholder="Email">
      <button type="submit">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  userForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl('')
  });
}
```

---

#### `FormGroup`
**What it is:** A collection of form controls that can be managed together.

**How it works:**
- Groups related form controls
- Provides validation for the entire group
- Manages the state of multiple controls as a unit

**Basic example:**
```typescript
@Component({
  template: `
    <form [formGroup]="loginForm">
      <input formControlName="username" placeholder="Username">
      <input formControlName="password" type="password" placeholder="Password">
    </form>
  `
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });
  
  onSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value); // { username: '...', password: '...' }
    }
  }
}
```

**Advanced WRP example:**
```typescript
@Component({
  template: `
    <form [formGroup]="driverForm" (ngSubmit)="onSubmit()">
      <div formGroupName="personalInfo">
        <input formControlName="firstName" placeholder="First Name">
        <input formControlName="lastName" placeholder="Last Name">
      </div>
      
      <div formGroupName="vehicleInfo">
        <select formControlName="vehicleType">
          <option value="truck">Truck</option>
          <option value="van">Van</option>
        </select>
      </div>
      
      <button type="submit" [disabled]="!driverForm.valid">Save Driver</button>
    </form>
  `
})
export class DriverFormComponent {
  driverForm = new FormGroup({
    personalInfo: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required])
    }),
    vehicleInfo: new FormGroup({
      vehicleType: new FormControl('truck'),
      licensePlate: new FormControl('')
    }),
    status: new FormControl('active')
  });
  
  onSubmit() {
    if (this.driverForm.valid) {
      const driverData = this.driverForm.value;
      this.driverService.createDriver(driverData);
    }
  }
}
```

**FormGroup methods:**
```typescript
const form = new FormGroup({
  name: new FormControl('John'),
  email: new FormControl('john@example.com')
});

// Get values
form.value; // { name: 'John', email: 'john@example.com' }
form.get('name')?.value; // 'John'

// Set values
form.patchValue({ name: 'Jane' }); // Partial update
form.setValue({ name: 'Jane', email: 'jane@example.com' }); // Full update

// Validation
form.valid; // true/false
form.errors; // Validation errors

// Reset
form.reset(); // Reset to initial values
form.reset({ name: 'Default' }); // Reset with new defaults
```

---

#### `FormControl`
**What it is:** A single form control that tracks the value and validation status of a form element.

**How it works:**
- Represents a single input field
- Tracks value, validation state, and user interactions
- Can have validators and custom validation logic

**Basic example:**
```typescript
@Component({
  template: `
    <input [formControl]="emailControl" placeholder="Email">
    <div *ngIf="emailControl.invalid && emailControl.touched">
      <p *ngIf="emailControl.errors?.['required']">Email is required</p>
      <p *ngIf="emailControl.errors?.['email']">Invalid email format</p>
    </div>
  `
})
export class EmailComponent {
  emailControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);
}
```

**Advanced WRP example:**
```typescript
@Component({
  template: `
    <form [formGroup]="routeForm">
      <input 
        formControlName="routeName" 
        placeholder="Route Name"
        [class.error]="routeNameControl.invalid && routeNameControl.touched">
      
      <select formControlName="driverId">
        <option value="">Select Driver</option>
        <option *ngFor="let driver of drivers()" [value]="driver.id">
          {{ driver.name }}
        </option>
      </select>
      
      <input 
        formControlName="estimatedTime" 
        type="number" 
        placeholder="Estimated Time (minutes)"
        min="1"
        max="480">
    </form>
  `
})
export class RouteFormComponent {
  drivers = signal<Driver[]>([]);
  
  routeForm = new FormGroup({
    routeName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      this.customRouteNameValidator
    ]),
    driverId: new FormControl('', [Validators.required]),
    estimatedTime: new FormControl(60, [
      Validators.required,
      Validators.min(1),
      Validators.max(480)
    ])
  });
  
  // Get individual controls for easier access
  get routeNameControl() { return this.routeForm.get('routeName')!; }
  get driverIdControl() { return this.routeForm.get('driverId')!; }
  get estimatedTimeControl() { return this.routeForm.get('estimatedTime')!; }
  
  // Custom validator
  customRouteNameValidator(control: FormControl) {
    const value = control.value;
    if (value && value.includes('test')) {
      return { invalidRouteName: true };
    }
    return null;
  }
  
  // Watch for changes
  ngOnInit() {
    this.routeNameControl.valueChanges.subscribe(value => {
      console.log('Route name changed:', value);
    });
    
    this.routeForm.statusChanges.subscribe(status => {
      console.log('Form status:', status); // 'VALID', 'INVALID', 'PENDING'
    });
  }
}
```

**FormControl properties and methods:**
```typescript
const control = new FormControl('initial value');

// Properties
control.value; // Current value
control.valid; // true/false
control.invalid; // true/false
control.touched; // Has user interacted with control
control.untouched; // Has not been touched
control.dirty; // Value has changed from initial
control.pristine; // Value unchanged from initial
control.errors; // Validation errors object
control.status; // 'VALID', 'INVALID', 'PENDING', 'DISABLED'

// Methods
control.setValue('new value'); // Set new value
control.patchValue('partial'); // Partial update
control.reset(); // Reset to initial value
control.disable(); // Disable the control
control.enable(); // Enable the control
control.markAsTouched(); // Mark as touched
control.markAsUntouched(); // Mark as untouched
control.updateValueAndValidity(); // Re-run validation
```

---

## Summary

These Angular concepts work together to create a modern, reactive application:

1. **Signals** provide reactive state management
2. **Computed** creates derived reactive values
3. **OnPush** change detection optimizes performance
4. **Host bindings** manage component styling and behavior
5. **Reactive forms** provide powerful form handling with validation

In the WRP project, these patterns enable:
- Efficient state management for drivers, routes, and customers
- Optimized performance with OnPush change detection
- Robust form handling for data entry
- Reactive UI updates when data changes
