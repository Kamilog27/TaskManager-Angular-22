import { Component, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './formulario-tarea.html',
  styleUrl: './formulario-tarea.css',
})
export class FormularioTarea {

  tareaCreada = output<string>();

  formulario = new FormGroup({
    nombre: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(3)
      ]
    })
  });

  guardarTarea() {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const nombre = this.formulario.controls.nombre.value.trim();

    if (nombre.length < 3) {
      return;
    }

    this.tareaCreada.emit(nombre);

    this.formulario.reset();
  }
}