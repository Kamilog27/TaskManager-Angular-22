import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports: [],
  selector: 'app-estadisticas',
  styleUrl: './estadisticas.css',
  templateUrl: './estadisticas.html',
})
export class Estadisticas {
    private router = inject(Router);

    volverATareas(){
      this.router.navigate(['/tareas'])
    }
}
