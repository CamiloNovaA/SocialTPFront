import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/User';
import { Router } from '@angular/router';

@Injectable({
providedIn: 'root'
})

export class AuthService {  
  servicesUrl = ' ';
  servicesAPI = 'api/User/';
  servicesAPILogin = 'api/user/login';
  servicesAPILogout = 'api/user/logout';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

    

  registerUser(user: User){
    return this.http.post<User>(this.servicesUrl + this.servicesAPI, user).pipe(map(data => data))
  }

  loginUser(user: User) {
    return this.http.post<User>(this.servicesUrl + this.servicesAPILogin, user).pipe(map(data => data))
  }
}
