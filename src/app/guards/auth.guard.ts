import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";



export const authGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const estaAutenticado = true;

    return estaAutenticado
        ? true
        : router.createUrlTree(['/tareas']);
};