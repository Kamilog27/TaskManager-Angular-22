import { Component } from '@angular/core';
import { ListaTareas } from './components/lista-tareas/lista-tareas';
import { Tarea } from '../models/tarea';
import { FormularioTarea } from './components/formulario-tarea/formulario-tarea';
import { inject } from '@angular/core';
import { TareasService } from './services/tareas';

@Component({
  imports: [ListaTareas, FormularioTarea],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  private tareasService = inject(TareasService);
  titulo = 'Mi administrador de tareas';

 tareas = this.tareasService.tareas;

  marcarComoCompletada(id: number) {

      this.tareasService.completarTarea(id);

  }

  agregarTarea(nombre: string) {

   this.tareasService.agregarTarea(nombre);

  }
}