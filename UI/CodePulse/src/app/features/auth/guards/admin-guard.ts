import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth-service';


export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.user();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const isWriter = user.roles?.includes('writer');

  if (!isWriter) {
    return router.createUrlTree(['/']);

  }

  return true;
};