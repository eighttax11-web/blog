import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public _http: HttpClient) { }

  register(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = 'json='+json;

    let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');

    return this._http.post(`${url}register`, params, {headers});
  }
}