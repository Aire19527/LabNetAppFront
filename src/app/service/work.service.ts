import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WorkDto } from '../models/Profile/profileWorkDto';
import { Observable } from "rxjs";
import { ResponseDto } from '../Response/responseDto';

@Injectable({
  providedIn: 'root'
})

export class WorkService {

  apiUrl: string = environment.apiLab;
  endPoint: string = 'Work';

  constructor( private http: HttpClient) { }

  public AddWork(workDto: WorkDto) : Observable<ResponseDto>{

    let url = `${this.apiUrl}${this.endPoint}/Insert`;
    return this.http.post<ResponseDto>(url, workDto);
  }

  public DeleteWork(id: number) : Observable<ResponseDto>{

    let url = `${this.apiUrl}${this.endPoint}/Delete/${id}`;
    return this.http.delete<ResponseDto>(url);
  }
}