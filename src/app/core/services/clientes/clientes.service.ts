import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) { }


  //todo obtener todos los clientes
  public getClientes(): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.allClientes;
    return this.http.get<any[]>(urlApi);
  }

  //todo obtener todos los clientes activos
  public getClientesActivos(): Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.clientesActivos;
    return this.http.get<any[]>(urlApi);
  }

  //todo: obtener cliente por id
  public getClienteId(id:number){
    const urlApi = environment.const_url_server + endpoints.clienteById.replace(':id', id.toString());
    return this.http.get(urlApi);
  }

  // todo: Crear un nuevo cliente
  public createCliente(cliente:any): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.createCliente;
    return this.http.post(urlApi, cliente);
  }

  //todo: MODIFICAR CLIENTE
  public updateCliente(id:number, cliente:any): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.updateCliente.replace(':id', id.toString());
    return this.http.put(urlApi, cliente);
  }
}
