import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class VentasService {

  constructor(private http: HttpClient) { }

  // obtener todas las ventas
  public getVentas():Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.obtenerVentas;
    return this.http.get<any[]>(urlApi);
  } 

  // obtener ventas realizadas a un cliente
  public getVentasByCliente(idCliente:number){
    const urlApi = environment.const_url_server + endpoints.ventaXidCliente.replace(':id', idCliente.toString());
    return this.http.get<any[]>(urlApi);

  }
  
  // obtener venta realizadas por usuario
  public getVentasByUsuario(idUsuario:number){
    const urlApi = environment.const_url_server + endpoints.ventaXidUsuario.replace(':id', idUsuario.toString());
    return this.http.get<any[]>(urlApi);
  }

  // obtener ventas por fecha
  public getVentasByDate(date:Date){
    const urlApi = environment.const_url_server + endpoints.ventaXfecha;
    return this.http.get<any[]>(urlApi);

  }

  // obtener ventas por rango de fecha
  public getVentasByDateRange(dateStart:Date,dateEnd:Date){
    const urlApi = environment.const_url_server + endpoints.ventaXRangoFecha.replace(':fechaInicio', dateStart.toString()).replace(':fechaFin', dateEnd.toString()); 
    return this.http.get<any[]>(urlApi);
  }

  // registrar una nueva venta
  public createVenta(venta:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.registrarVenta;
    return this.http.post<any>(urlApi, venta);
  }

  // modificar venta ( se usa el mismo metodo para tambien cambiar el estado de la venta)
  public updateVenta(idVenta:number, venta:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.modificarVenta.replace(':id', idVenta.toString());
    return this.http.put<any>(urlApi, venta);
  } 

}
