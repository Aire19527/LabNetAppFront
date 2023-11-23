import { ResponseDto } from '../models/response';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private urlApi: string = `${environment.apiLab}${environment.serviceRol}`;

  constructor(private http: HttpClient) {}

  getRole() {
    return this.http.get<ResponseDto>(this.urlApi + '/GetAll');
  }
}
