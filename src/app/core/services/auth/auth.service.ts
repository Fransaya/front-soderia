import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  // iniciar sesion
  public login(body:any){
    const urlApi = `${environment.const_url_server}${endpoints.login}`;
    return this.http.post(urlApi,body);
  };

  // cerrar sesion
  public logout(id:number,token:string){
    const urlApi = `${environment.const_url_server}${endpoints.logout}`;
    const body = {
      id, 
      token
    }
    return this.http.post(urlApi,body);
  };

  // obtener todos los usuarios
  public getAllUsers():Observable<any>{
    const urlApi = `${environment.const_url_server}${endpoints.allUsers}`;
    return this.http.get(urlApi);
  }

  // obtener usuario por id
  public getUserById(id:number):Observable<any>{
    const urlApi = `${environment.const_url_server}${endpoints.userById.replace(':id', String(id))}`;
    return this.http.get(urlApi);
  }

  // crear nuevo usuario
  public createUser(body:any):Observable<any>{
    const urlApi = `${environment.const_url_server}${endpoints.registerUser}`;
    return this.http.post(urlApi, body);
  }

  // modificar usuario
  public updateUser(id:number, body:any):Observable<any>{
    const urlApi = `${environment.const_url_server}${endpoints.updateUser.replace(':id', String(id))}`;
    return this.http.put(urlApi, body);
  }

  // cambiar clave usuario
  public updatePassword(id:number, password:any):Observable<any>{
    const urlApi = `${environment.const_url_server}${endpoints.updatePasswordUser.replace(':id', String(id))}`;
    return this.http.put(urlApi, {password});
  }

}
