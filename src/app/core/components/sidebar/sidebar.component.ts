import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PermisosService } from '../../services/permisos/permisos.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  isExpanded = true;

  rolUser:number=0;

  usuario:any;

  modulos:any[] = [];

  ngOnInit(): void {
    this.rolUser = Number(localStorage.getItem('rol'));
    if(this.rolUser !== 0){
      this.getPermisosModulos();
    }
    this.getInfoUser();
  }

  constructor(private router:Router, private permisoService:PermisosService, private authService: AuthService){

  }

  toggleSidebar() {
    this.isExpanded = !this.isExpanded;
  }

  private getPermisosModulos(){
    this.permisoService.getPermisosByRol(this.rolUser).subscribe({
      next:(res:any)=>{
        // console.log("modulos", res);
        this.modulos = res;
      },
      error:(err:any)=>{
        console.error("error al obtener permisos", err);
      }
    })
  }

  public cerrarSesion(){
    let idUser = localStorage.getItem('idUser');
    let token =localStorage.getItem('token');
    token = token ? token : '';
    this.authService.logout(Number(idUser), token).subscribe({
      next:(res:any)=>{
        if(res.status){
          localStorage.clear();
          this.router.navigate(['']);

        }else{
          console.error("error al cerrar sesion");
        }
      },
      error:(err:any)=>{
        console.error("error al cerrar sesion", err);
      }
    })
  }

  private getInfoUser(){
    let idUser = localStorage.getItem('idUser');
    this.authService.getUserById(Number(idUser)).subscribe({
      next:(res:any)=>{
        console.log("res", res)
        this.usuario = res[0];
      },
      error:(err:any)=>{
        console.error("error al obtener usuario", err);
      }
    })
  }

}
