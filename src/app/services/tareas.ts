import { Injectable, signal } from '@angular/core';
import { Tarea } from '../../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  tareas = signal<Tarea[]>([
    {
      id: 1,
      nombre: 'Estudiar Angular',
      completada: false
    },
    {
      id: 2,
      nombre: 'Crear mi primera aplicación',
      completada: false
    },
    {
      id: 3,
      nombre: 'Aprender Signals',
      completada: false
    }
  ]);
  agregarTarea(nombre: string) {
  const nuevaTarea: Tarea = {
    id: Date.now(),
    nombre: nombre,
    completada: false
  };

  this.tareas.update(lista => [
    ...lista,
    nuevaTarea
  ]);
}
completarTarea(id: number) {
  this.tareas.update(lista =>
    lista.map(tarea =>
      tarea.id === id
        ? { ...tarea, completada: true }
        : tarea
    )
  );
}
}
