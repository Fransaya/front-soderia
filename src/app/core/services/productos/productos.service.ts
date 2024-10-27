import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  // obtener todos los productos
  public getProductos():Observable<any>{
    const urlApi = environment.const_url_server + endpoints.allProductos;
    return this.http.get<any[]>(urlApi);
  }

  // obtener productos activos
  public getProductosActivos(): Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.productosActivos;
    return this.http.get<any[]>(urlApi);
  }

  // crear nuevo producto
  public createProducto(producto:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.createProduct;
    return this.http.post<any>(urlApi, producto);
  }

  // modificar un producto
  public updateProducto(idProducto:number,producto:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.updateProduct.replace(':id', idProducto.toString());
    return this.http.put<any>(urlApi, producto);
  }

  // obtener productos de la lista de precios
  public getProductosListaPrecios(): Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.productosListaPrecios;
    return this.http.get<any[]>(urlApi);
  }

  // agregar productos a la lista de precios
  public addProductosListaPrecios(productos:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.addProductListaPrecio;
    return this.http.post<any>(urlApi, {productos});
  }

  // modificar producto de la lista de precio
  public updateProductLista(idDetalle:any, producto:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.updateProductListaPrecio.replace(':idDetalle', idDetalle.toString());
    return this.http.put<any>(urlApi, producto);
  }

  // eliminar producto de la lista de precio
  public deleteProductLista(idDetalle:any):Observable<any>{
    const urlApi = environment.const_url_server + endpoints.deleteProductListaPrecio.replace(':idDetalle', idDetalle.toString());
    return this.http.delete<any>(urlApi);
  }
}
