import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  servicesUrl = 'https://localhost:44327/';
  servicesAPI = 'api/user/';
  servicesAPILogin = 'api/user/login';
  servicesAPIPassword = 'api/user/getPasswordEncrypt';

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.servicesUrl + this.servicesAPI, user)
  }

  editUser(user: User): Observable<User> {
    return this.http.put<User>(this.servicesUrl + this.servicesAPI + user.idUser, user)
  }

  getInfoUser(idUser: string): Observable<User> {
    return this.http.get<User>(this.servicesUrl + this.servicesAPI + idUser)
  }

  login(credentials: User): Observable<User> {
    return this.http.post<User>(this.servicesUrl + this.servicesAPILogin, credentials);
  }

  getPassword(credentials: User): Observable<User> {
    return this.http.post<User>(this.servicesUrl + this.servicesAPIPassword, credentials);
  }
}