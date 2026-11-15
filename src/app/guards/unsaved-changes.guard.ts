import { CanDeactivateFn } from '@angular/router';

interface FormularioConCambios {
    hayCambiosSinGuardar: boolean;
}

export const salirGuard: CanDeactivateFn<FormularioConCambios> = (component) => {

    if (!component.hayCambiosSinGuardar) {
        return true;
    }

    return window.confirm('¿Deseas abandonar el formulario? Tienes cambios sin guardar.');
};