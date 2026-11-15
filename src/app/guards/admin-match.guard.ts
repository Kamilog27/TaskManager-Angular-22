import { CanMatchFn } from '@angular/router';



export const adminMatchGuard: CanMatchFn=(route, segments)=> {

   const esAdministrador = false

    return esAdministrador
};