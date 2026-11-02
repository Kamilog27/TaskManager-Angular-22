import { Component, OnInit, signal } from '@angular/core';
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
export class App implements OnInit {
  private tareasService = inject(TareasService);
  titulo = 'Mi administrador de tareas';
  cargando = this.tareasService.cargando;
  error =  this.tareasService.error;
  tareas = this.tareasService.tareas;
  ngOnInit() {
    this.tareasService.cargarTareas();
  }
  marcarComoCompletada(id: number) {

    this.tareasService.completarTarea(id);

  }
eliminarTarea(id: number) {
  this.tareasService.eliminarTarea(id);
}
  agregarTarea(nombre: string) {

    this.tareasService.agregarTarea(nombre);

  }
}