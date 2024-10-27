import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environmets/environment';
import { endpoints } from '../../../../environmets/endpoints';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private http: HttpClient) { }

  // obtener los roles
  public getRoles(): Observable<any> {
    return this.http.get(`${environment.const_url_server}${endpoints.allRoles}`);
  }
}
