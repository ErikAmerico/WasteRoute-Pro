/**
 * HTTP Request Interceptor for Request Tracking
 * 
 * This interceptor automatically adds a correlation ID to all outgoing HTTP requests.
 * Correlation IDs are used for request tracing, debugging, and monitoring across
 * distributed systems and microservices.
 * 
 * Features:
 * - Generates unique UUID for each request
 * - Adds X-Correlation-Id header to all HTTP requests
 * - Enables request tracing and debugging
 * - Helps with log correlation in backend services
 */

import { HttpInterceptorFn } from '@angular/common/http';

/**
 * HTTP interceptor that adds correlation ID to all outgoing requests
 * 
 * @param req - The outgoing HTTP request
 * @param next - Function to continue the request pipeline
 * @returns Observable of the HTTP response with correlation ID header added
 * 
 * Process:
 * 1. Generates a unique correlation ID using crypto.randomUUID()
 * 2. Clones the request and adds X-Correlation-Id header
 * 3. Passes the modified request to the next interceptor/handler
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Generate a unique correlation ID for request tracking
  const corr = crypto.randomUUID();
  
  // Clone the request and add the correlation ID header
  // This allows backend services to track requests across the system
  return next(req.clone({ setHeaders: { 'X-Correlation-Id': corr } }));
};
