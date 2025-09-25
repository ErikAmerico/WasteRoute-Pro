/**
 * Authentication Guard for Route Protection
 * 
 * This guard implements role-based access control (RBAC) for Angular routes.
 * It checks if the current user has the required role(s) to access a protected route.
 * 
 * Usage in routes:
 * { path: 'admin', canActivate: [authGuard(['admin'])], component: AdminComponent }
 * { path: 'billing', canActivate: [authGuard(['billing', 'admin'])], component: BillingComponent }
 */

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from './session.service';

/**
 * Creates an authentication guard function that checks user roles
 * 
 * @param roles - Array of role strings that are allowed to access the route
 * @returns A CanActivateFn that performs the role-based authorization check
 * 
 * Behavior:
 * - If user exists and has one of the required roles: allows access (returns true)
 * - If user doesn't exist or lacks required role: redirects to '/ops' route
 * - Uses dependency injection to get SessionService and Router instances
 */
export const authGuard =
  (roles: string[]): CanActivateFn =>
  () => {
    // Inject required services using Angular's modern inject() function
    const sess = inject(SessionService);
    const router = inject(Router);
    
    // Get current user from session service
    const user = sess.user();
    
    // Check if user exists and has one of the required roles
    // If authorized: return true to allow navigation
    // If not authorized: return URL tree to redirect to '/ops'
    return user && roles.includes(user.role) ? true : router.createUrlTree(['/ops']);
  };
