import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';

export const adminChildGuard: CanActivateChildFn=(route, segments)=> {

   const router = inject(Router);
  const esAdministrador = false;

  return esAdministrador
    ? true
    : router.createUrlTree(['/tareas']);
};