import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  let router = inject(Router);
  if (!(localStorage.getItem('access_token') || localStorage.getItem('refresh_token'))) return true;
  router.navigate(['/home'])
  return false;
};
