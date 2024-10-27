import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class BarriosService {

  constructor(private http: HttpClient) { }

  public getBarrios(): Observable<any[]>{
    const urlApi = environment.const_url_server + endpoints.allBarrios;
    return this.http.get<any[]>(urlApi);
  }
}
