import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(private http: HttpClient) { }

  // obtener permiso de un rol
  public getPermisosByRol(idRol:number):Observable<any>{
    return this.http.get(environment.const_url_server + endpoints.permisos.replace(':id', String(idRol)));
  }

  // obtener modulos de un usuario
  public getModulosByUser(idUser:number):Observable<any>{
    return this.http.get(environment.const_url_server + endpoints.modulos.replace(':id', String(idUser)));
  }

  // crear nuevos permisos
  public createPermisos(body:any):Observable<any>{
    return this.http.post(environment.const_url_server + endpoints.permisos, body);
  }

  // modificar permisos
  public updatePermisos(body:any):Observable<any>{
    return this.http.put(environment.const_url_server + endpoints.permisos, body);
  }
}
