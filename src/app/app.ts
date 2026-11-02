import { Component, signal } from '@angular/core';
import { ListaTareas } from './components/lista-tareas/lista-tareas';
import { Tarea } from '../models/tarea';
import { FormularioTarea } from './components/formulario-tarea/formulario-tarea';


@Component({
  imports: [ListaTareas, FormularioTarea],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {

  titulo = 'Mi administrador de tareas';

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

  marcarComoCompletada(id: number) {

    this.tareas.update(lista =>
      lista.map(tarea =>
        tarea.id === id
          ? { ...tarea, completada: true }
          : tarea
      )
    );

  }

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
}