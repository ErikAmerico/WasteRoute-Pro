/**
 * Application Configuration
 * 
 * This file configures the core Angular application providers and settings.
 * It sets up routing, HTTP client, change detection, and custom interceptors.
 * 
 * Key Features:
 * - Zoneless change detection for better performance
 * - Lazy-loaded routing with component input binding
 * - HTTP client with custom interceptors
 * - Modern Angular 20+ configuration approach
 */

import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/auth.interceptor';

/**
 * Main application configuration object
 * 
 * This configuration sets up all the core providers needed for the WRP application:
 * - Change detection strategy
 * - Routing configuration
 * - HTTP client with interceptors
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Zoneless Change Detection
     * 
     * Enables Angular's new zoneless change detection system for better performance.
     * This eliminates the need for Zone.js and provides more predictable change detection.
     * Benefits:
     * - Reduced bundle size (no Zone.js)
     * - Better performance
     * - More predictable change detection
     * - Easier debugging
     */
    provideZonelessChangeDetection(),
    
    /**
     * Router Configuration
     * 
     * Sets up Angular routing with lazy-loaded components and input binding.
     * Features:
     * - Lazy loading: Components are loaded on-demand for better performance
     * - Component input binding: Route parameters automatically bound to component inputs
     * - All routes defined in app.routes.ts
     */
    provideRouter(routes, withComponentInputBinding()),
    
    /**
     * HTTP Client Configuration
     * 
     * Configures the HTTP client with custom interceptors for request processing.
     * Current interceptors:
     * - authInterceptor: Adds correlation IDs to all HTTP requests for tracking
     * 
     * This setup enables:
     * - Request/response transformation
     * - Authentication headers
     * - Error handling
     * - Request logging and monitoring
     */
    provideHttpClient(withInterceptors([authInterceptor])),
  ],
};
