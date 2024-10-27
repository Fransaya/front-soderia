import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { PermisosService } from '../services/permisos/permisos.service';

export const protectionGuard: CanActivateFn = (route, state) => {

   const router = inject(Router); // Inyectamos el Router
    const persisoService = inject(PermisosService);


  let idUser = localStorage.getItem('idUser');

  if(idUser){
    persisoService.getModulosByUser(Number(idUser)).subscribe({
      next:(res:any)=>{
        const paths = res.map((item:any )=> item.pathMenu);

        if(paths.includes(route.routeConfig?.path)){
          return true
        }else{
          router.navigate(['/menu']);
          return false;
        }
      },error:(err)=>{
        console.error("Error al obtener los permisos", err);
        return false;
      }
    });
  }


  return true;
};
