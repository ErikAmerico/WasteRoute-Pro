/**
 * Session Management Service
 * 
 * This service manages user session state throughout the application using Angular signals.
 * It provides reactive user information and role management for authentication and authorization.
 * 
 * Features:
 * - Reactive user state using Angular signals
 * - Role-based user management
 * - Immutable user updates
 * - Singleton service (providedIn: 'root')
 * 
 * Note: Currently uses mock data for development. In production, this would integrate
 * with authentication APIs and token management.
 */

import { Injectable, signal } from '@angular/core';

/**
 * User roles available in the system
 * - dispatcher: Can manage routes and schedules
 * - billing: Can access billing and financial data
 * - admin: Full system access
 * - driver: Can view assigned routes and update status
 */
export type Role = 'dispatcher' | 'billing' | 'admin' | 'driver';

/**
 * User object structure containing user identification and role information
 */
export type User = { id: string; name: string; role: Role };

/**
 * Session service that manages user authentication state and role information
 * 
 * This service uses Angular signals for reactive state management, allowing components
 * to automatically update when user information changes.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  /**
   * Private signal containing the current user information
   * Initialized with mock data for development purposes
   */
  private _user = signal<User>({ id: '1', name: 'Erik', role: 'admin' });
  
  /**
   * Read-only access to the current user signal
   * Components can subscribe to this to reactively update when user changes
   */
  readonly user = this._user.asReadonly();
  
  /**
   * Updates the user's role while preserving other user properties
   * 
   * @param role - The new role to assign to the current user
   * 
   * This method is useful for:
   * - Role switching in development/testing
   * - Admin role management features
   * - User permission updates
   */
  setRole(role: Role) {
    // Update the user signal with the new role, spreading existing user properties
    this._user.update((u) => ({ ...u, role }));
  }
}
