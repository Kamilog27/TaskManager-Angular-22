import { Component, inject } from '@angular/core';
import { TareasService } from '../../services/tareas';
import { FormularioTarea } from '../../components/formulario-tarea/formulario-tarea';
import { ListaTareas } from '../../components/lista-tareas/lista-tareas';
import { Router } from '@angular/router';

@Component({
  imports: [FormularioTarea, ListaTareas],
  selector: 'app-tareas',
  styleUrl: './tareas.css',
  templateUrl: './tareas.html',
})
export class Tareas {
    private router = inject(Router);

  irAEstadisticas() {
    this.router.navigate(['/estadisticas']);
  }
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
