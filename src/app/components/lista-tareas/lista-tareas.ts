import { Component, computed, input, output, signal } from '@angular/core';
import { Tarea } from '../../../models/tarea';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

type FiltroEstado = 'todas' | 'pendientes' | 'completadas';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-lista-tareas',
  styleUrl: './lista-tareas.css',
  templateUrl: './lista-tareas.html',
})
export class ListaTareas {
  titulo = input.required<string>();

  tareas = input.required<Tarea[]>();

  filtroEstado = signal<FiltroEstado>('todas');
  tareaEliminada = output<number>();
  tareaCompletada = output<number>();
  // 1. Control del campo de búsqueda
  busqueda = new FormControl('', {
    nonNullable: true
  });

  // 2. Convertimos valueChanges (Observable) en Signal
  terminoBusqueda = toSignal(
    this.busqueda.valueChanges,
    { initialValue: '' }
  );

  // 3. Calculamos automáticamente las tareas filtradas
  tareasFiltradas = computed(() => {

    const termino = this.terminoBusqueda()
      .toLowerCase()
      .trim();

    const estado = this.filtroEstado();

    return this.tareas().filter(tarea => {

      const coincideTexto = tarea.nombre
        .toLowerCase()
        .includes(termino);

      const coincideEstado =
        estado === 'todas' ||
        (estado === 'pendientes' && !tarea.completada) ||
        (estado === 'completadas' && tarea.completada);

      return coincideTexto && coincideEstado;

    });

  });
  totalPendientes = computed(() =>
    this.tareas().filter(tarea => !tarea.completada).length
  );

  totalCompletadas = computed(() =>
    this.tareas().filter(tarea => tarea.completada).length
  );
  totalTareas = computed(() => this.tareas().length);

  porcentajeCompletado = computed(() =>
    this.totalTareas() > 0 ? (this.totalCompletadas() / this.totalTareas()) * 100 : 0
  );

  completarTarea(id: number) {
    this.tareaCompletada.emit(id);
  }
  eliminarTarea(id: number) {
    this.tareaEliminada.emit(id);
  }
}
