import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Login } from '../models/login';
import { ResponseDto } from '../models/response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlApi: string = `${environment.apiLab}${environment.serviceLogin}`;
  userToken: string = '';

  constructor(private http: HttpClient) {
    this.readToken();
  }

  logout() {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      localStorage.removeItem('expiresIn');
    }
  }

  login(user: Login) {
    return this.http.post<ResponseDto>(`${this.urlApi}/Login`, user).pipe(
      map((resp) => {
        this.saveToken(resp['result'].token, resp['result'].expiration);
        return resp;
      })
    );
  }

  saveToken(idToken: string, expiresIn: number) {
    this.userToken = idToken;

    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds(expiresIn);
    localStorage.setItem('expiresIn', today.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token') || '';
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    let response: boolean = false;
    if (this.userToken.length < 2) {
      response = false;
    } else {
      const expiraIn = Number(localStorage.getItem('expiresIn'));
      const todayExpira = new Date();

      todayExpira.setTime(expiraIn);
      if (todayExpira > new Date()) {
        response = true;
      }
    }
    return response;
  }

  DecodeJWT(token: string): JSON {
    const decodedToken = atob(token.split('.')[1]);
    const decodedObject = JSON.parse(decodedToken);
    return decodedObject;
  }

  getValueByKey = (obj, key) => {
    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }
    return null;
  };
}
