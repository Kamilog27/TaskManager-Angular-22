import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'tareas',
        loadComponent: () =>
            import('../app/pages/tareas/tareas')
                .then(m => m.Tareas)
    },
    {
        path: 'estadisticas',
       loadComponent: () =>
            import('../app/pages/estadisticas/estadisticas')
                .then(m => m.Estadisticas)

    },
    {
        path: '',
        redirectTo: 'tareas',
        pathMatch: 'full'

    }
];
