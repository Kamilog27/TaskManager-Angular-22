import { Component, inject,input} from '@angular/core';
// import { toSignal } from '@angular/core/rxjs-interop';
// import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Tarea } from '../../../models/tarea';

@Component({
  selector: 'app-detalle-tarea',
  imports: [],
  templateUrl:'./detalle-tarea.html' ,
  styleUrl: './detalle-tarea.css',
})
export class DetalleTarea {
  //  private route = inject(ActivatedRoute);

  tarea = input.required<Tarea>();
}
