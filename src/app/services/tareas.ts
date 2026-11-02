import { Injectable, signal, inject } from '@angular/core';
import { Tarea } from '../../models/tarea';
import { Observable,map } from 'rxjs';
import { TodoApi } from '../../models/todo-api';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private http = inject(HttpClient);
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

  cargando = signal<boolean>(false);
  error = signal<string | null>(null);

  obtenerTareas(): Observable<Tarea[]> {
    return this.http.get<TodoApi[]>(
      'https://jsonplaceholder.typicode.com/todos'
    ).pipe(
      map(todos =>
        todos.map(todo => ({
          id: todo.id,
          nombre: todo.title,
          completada: todo.completed
        }))
      )
    );
  }
  cargarTareas() {
    this.cargando.set(true);
    this.error.set(null);
    this.obtenerTareas().subscribe({
      next: (tareas) => {
        this.cargando.set(false);
        this.tareas.set(tareas);
      },
      error: (error) => {
        // Aquí manejaremos el error.
        this.error.set('No fue posible cargar las tareas.');
        this.cargando.set(false);


      }
    })
  }


// Crear tarea y actualizar Signal
  agregarTarea(nombre: string) {
    this.cargando.set(true);
    this.error.set(null);

    this.crearTareaApi(nombre).subscribe({
      next: (respuesta) => {

        const nuevaTarea: Tarea = {
          id: respuesta.id,
          nombre: respuesta.title,
          completada: respuesta.completed
        };

        this.tareas.update(lista => [
          ...lista,
          nuevaTarea
        ]);

        this.cargando.set(false);
      },

      error: () => {
        this.error.set('No fue posible guardar la tarea.');
        this.cargando.set(false);
      }
    });
  }


  completarTarea(id: number) {
    this.cargando.set(true);
    this.error.set(null);
    this.completarTareaApi(id).subscribe({
      next: (respuesta) => {

        this.tareas.update(lista =>
          lista.map(tarea =>
            tarea.id === id
              ? { ...tarea, completada: true }
              : tarea
          )
        );

        this.cargando.set(false);
      },

      error: () => {
       this.error.set('No fue posible completar la tarea.');
        this.cargando.set(false);
      }
    })
  }

  eliminarTarea(id: number){
    this.cargando.set(true);
    this.error.set(null);
    this.eliminarTareaApi(id).subscribe({
      next: () => {

        this.tareas.update(lista =>
        lista.filter(tarea => tarea.id !== id)
      );

        this.cargando.set(false);
      },

      error: () => {
       this.error.set('No fue posible eliminar la tarea.');
        this.cargando.set(false);
      }
    })
  }

 // POST: crear tarea en la API
  crearTareaApi(nombre: string): Observable<TodoApi> {
    const nuevaTarea = {
      userId: 1,
      title: nombre,
      completed: false
    };

    return this.http.post<TodoApi>('https://jsonplaceholder.typicode.com/todos', nuevaTarea);
  }

  completarTareaApi(id:number): Observable<TodoApi> {
    return this.http.patch<TodoApi>(`https://jsonplaceholder.typicode.com/todos/${id}`,{ completed: true });
  }


  eliminarTareaApi(id: number): Observable<unknown>{
    return this.http.delete<unknown>(`https://jsonplaceholder.typicode.com/todos/${id}`,);

  }
}
