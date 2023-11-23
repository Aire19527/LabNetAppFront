import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Token } from '../models/token';
import { ResponseDto } from '../models/response';
import { AuthService } from './auth.service';
import { UpdatePassword } from '../models/updatePassword';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  userToken: string = '';
  private urlApi: string = `${environment.apiLab}${environment.serviceUser}`;
  constructor(private http: HttpClient, private _authservice: AuthService) {}

  getAll() {
    const userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: userToken });
    const options = { headers: headers };

    return this.http.get<ResponseDto>(this.urlApi + '/GetAll', options);
  }

  addUser(user: User): Observable<User> {
    this.userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: this.userToken });

    return this.http.post<User>(`${this.urlApi}/Insert`, user, {
      headers: headers,
    });
  }

  updateUserPassword(password: UpdatePassword) {
    this.userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: this.userToken });

    return this.http.put<UpdatePassword>(
      this.urlApi + `/UpdatePassword`,
      password,
      { headers: headers }
    );
  }

  deleteUser(id: number) {
    this.userToken = `Bearer ${this._authservice.readToken()}`;
    const headers = new HttpHeaders({ Authorization: this.userToken });

    return this.http.delete<User>(this.urlApi + `/Delete/${id}`, {
      headers: headers,
    });
  }
}
