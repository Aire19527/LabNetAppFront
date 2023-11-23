import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseDto } from '../Response/responseDto';
import { Skill } from '../models/skill';
import { AddSkillDto } from '../Response/addSkillDto';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private urlApi: string = `${environment.apiLab}${environment.serviceSkill}`;

  constructor(private http: HttpClient, private _authservice: AuthService) {}

  getSkill() {
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: userToken });
    const options = { headers: headers };
    return this.http.get<ResponseDto>(this.urlApi + '/GetAll', options);
  }

  AddSkill(addskillDto: AddSkillDto): Observable<AddSkillDto> {
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: userToken });
    const options = { headers: headers };
    return this.http.post<AddSkillDto>(this.urlApi + '/Insert', addskillDto, {
      headers: headers,
    });
  }

  deleteSkill(id: number) {
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: userToken });
    const options = { headers: headers };
    return this.http.delete<Skill>(this.urlApi + `/Delete/${id}`, {
      headers: headers,
    });
  }
}
