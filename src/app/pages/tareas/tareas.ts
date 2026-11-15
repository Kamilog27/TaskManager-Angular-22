import { Component, computed, inject } from '@angular/core';
import { TareasService } from '../../services/tareas';
import { FormularioTarea } from '../../components/formulario-tarea/formulario-tarea';
import { ListaTareas } from '../../components/lista-tareas/lista-tareas';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

@Component({
  imports: [FormularioTarea, ListaTareas],
  selector: 'app-tareas',
  styleUrl: './tareas.css',
  templateUrl: './tareas.html',
})
export class Tareas {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  estado = toSignal(
    this.route.queryParamMap.pipe(
      map(params => params.get('estado'))
    ),
    { initialValue: null }
  );

  tareasfiltradas = computed(() => {

    const estadoActual = this.estado();

    if (estadoActual === null) {
      return this.tareas();
    }

    if (estadoActual === 'pendientes') {
      // Devuelve solamente las tareas pendientes
      this.tareas().filter(tarea => !tarea.completada)
    }

    if (estadoActual === 'completadas') {
      // Devuelve solamente las tareas completadas
      this.tareas().filter(tarea => tarea.completada)
    }
    return this.tareas();

  })
  irAEstadisticas() {
    this.router.navigate(['/estadisticas']);
  }
  private tareasService = inject(TareasService);
  titulo = 'Mi administrador de tareas';
  cargando = this.tareasService.cargando;
  error = this.tareasService.error;
  tareas = this.tareasService.tareas;
  ngOnInit() {
    this.tareasService.cargarTareas();
  }

  filtrarPorEstado(estado: string) {
    this.router.navigate(['/tareas'], {
      queryParams: {
        estado: estado
      },
      queryParamsHandling:
        'merge'

    })
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
