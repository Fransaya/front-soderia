import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {

  constructor(private http: HttpClient) { }

  // obtener todos los pedidos
  public getPedidos(): Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.allPedidos;
    return this.http.get<any[]>(urlApi);
  };

  // obtener pedidos por querys
  public getPedidosParams(fecha:any, estado:any, idCliente:any, fechaDesde:Date | null, fechaHasta:Date | null):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.allPedidos;
    let params = new HttpParams();
    if(fecha != null){
      params = params.append('fecha', fecha);
    }
    if(estado != null){
      params = params.append('estado', estado);
    }
    if(idCliente != null){
      params = params.append('idCliente', idCliente);
    }
    if(fechaDesde != null && fechaHasta != null){
      params = params.append('fechaDesde', fechaDesde.toString());
      params = params.append('fechaHasta', fechaHasta.toString());
    }
    return this.http.get(urlApi, {params: params});
  }

  // registrar pedido
  public createPedido(pedido:any): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.registrarPedido;
    return this.http.post(urlApi, pedido);
  };

  // actualizar datos pedido
  public updatePedido(idPedido:number, pedido:any): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.editarPedido.replace(':id', idPedido.toString());
    return this.http.put(urlApi, pedido);
  }

  // eliminar item de un pedido
  public deleteItemPedido(idPedido:number, producto:any): Observable<any>{
    const urlApi = environment.const_url_server + endpoints.deleteItemPedido.replace(':id', idPedido.toString());
    return this.http.put(urlApi, producto);
  }
}
