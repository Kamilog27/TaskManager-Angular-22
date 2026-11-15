import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { salirGuard } from './guards/unsaved-changes.guard';
import { adminMatchGuard } from './guards/admin-match.guard';
import { adminChildGuard } from './guards/admin-child.guard';
import { tareaResolver } from './resolvers/tarea.resolver';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
    {
        path: 'admin',
        canActivateChild: [adminChildGuard],
        children: [
            {
                path: 'usuarios',
                loadComponent: () =>
                    import('../app/pages/tareas/tareas')
                        .then(m => m.Tareas)
            },
            {
                path: 'configuracion',
                loadComponent: () =>
                    import('../app/pages/tareas/tareas')
                        .then(m => m.Tareas)
            },
            {
                path: 'reportes',
                loadComponent: () =>
                    import('../app/pages/tareas/tareas')
                        .then(m => m.Tareas)
            },
            {
                path: '',
                redirectTo: 'usuarios',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'tareas',
        loadComponent: () =>
            import('../app/pages/tareas/tareas')
                .then(m => m.Tareas),

    },
    {
        path: 'tareas/nueva',
        loadComponent: () =>
            import('../app/components/formulario-tarea/formulario-tarea')
                .then(m => m.FormularioTarea),
        canDeactivate: [salirGuard]

    },
    {
        path: 'tareas/:id',
        loadComponent: () =>
            import('../app/pages/detalle-tarea/detalle-tarea')
                .then(m => m.DetalleTarea),
        resolve: {
            tarea: tareaResolver
        }
    },
    {
        path: 'estadisticas',
        loadComponent: () =>
            import('../app/pages/estadisticas/estadisticas')
                .then(m => m.Estadisticas),
        canActivate: [authGuard],

        // canMatch: [adminMatchGuard]
          data: {
            titulo: 'Panel de estadísticas',
            descripcion: 'Resumen general de las tareas',
            requiereAutorizacion: true
        }
    },
    {
        path: 'estadisticas',
        loadComponent: () =>
            import('../app/pages/tareas/tareas')
                .then(m => m.Tareas),
      
    },
    {
        path: '',
        redirectTo: 'tareas',
        pathMatch: 'full'

    },
    {
        path: '**',
        loadComponent: () =>
            import('../app/pages/not-found/not-found')
                .then(m => m.NotFound)

    }
];
