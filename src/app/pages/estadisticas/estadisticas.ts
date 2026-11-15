import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-estadisticas',
  styleUrl: './estadisticas.css',
  templateUrl: './estadisticas.html',
})
export class Estadisticas {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  volverATareas() {
    this.router.navigate(['/tareas'])
  }
  titulo = this.route.snapshot.data['titulo'];
  descripcion = this.route.snapshot.data['descripcion'];
  requiereAutorizacion = this.route.snapshot.data['requiereAutorizacion'];
}
