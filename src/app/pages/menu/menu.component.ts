import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { PermisosService } from '../../core/services/permisos/permisos.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  providers:[MessageService]
})
export class MenuComponent implements OnInit {

  usuario:any;

  permisos:any[]=[];

  ngOnInit(): void {
    this.getUserInfo();
  }

  constructor(private userService:AuthService, private permisoService:PermisosService, private router:Router, private messageService:MessageService){

  };

  // obtener permisos del rol
  private getPermisosRol(idRol:number):void{
    this.permisoService.getPermisosByRol(idRol).subscribe({
      next:(response:any)=>{
        this.permisos = response;
      },
      error:(err:any)=>{
        console.error("Error al obtener permisos", err)
      }
    });
  }

  // obtener informacion del usuario
  private getUserInfo(){
    const idUser = Number(localStorage.getItem('idUser'));
    if(idUser){
      this.userService.getUserById(idUser).subscribe({
        next:(response:any)=>{
          this.usuario = response[0];
          localStorage.setItem('rol', response[0].idRol)
          this.getPermisosRol(this.usuario.idRol);
        },
        error:(err:any)=>{
          console.error("Error al obtener usuario", err)
        }
      });
    }
  }

  // cerrar sesion
  public cerrarSesion():void{
    let idUser = localStorage.getItem('idUser');
    let token =localStorage.getItem('token');
    token = token ? token : '';
    this.userService.logout(Number(idUser), token).subscribe({
      next:(res:any)=>{
        // console.log("logout", res);
        if(res.status){
          localStorage.clear();
          this.router.navigate(['']);
          this.messageService.add({severity:'success', summary: 'Sesión cerrada', detail: 'Sesión cerrada correctamente'});


        }else{
          console.error("error al cerrar sesion");
        }
      },
      error:(err:any)=>{
        console.error("error al cerrar sesion", err);
      }
    })

  }
}
