import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { Tarea } from "../../models/tarea";
import { TareasService } from "../services/tareas";
import {catchError,of, map } from "rxjs";



export const tareaResolver: ResolveFn<Tarea> = (route, state) => {
  // return {
  //   id: 5,
  //   nombre: 'Aprender Resolvers',
  //   completada: false
  // };
  const tarea = inject(TareasService);
  const router = inject(Router);
  const id = Number(route.paramMap.get('id'));

  if (!Number.isInteger(id) || id <= 0) {
    return new RedirectCommand(
      router.createUrlTree(['/tareas'])
    );
  }

  
  return tarea.obtenerTareaPorId(id).pipe(

    map(tarea => {
      if (tarea.id) {
        return tarea;
      }

      return new RedirectCommand(
        router.createUrlTree(['/tareas'])
      );
    }),

    catchError(error => {
      console.error('Error al consultar la tarea:', error);

      return of(
        new RedirectCommand(
          router.createUrlTree(['/tareas'])
        )
      );
    })

  );
};  