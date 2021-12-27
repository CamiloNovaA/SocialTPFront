import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService implements CanActivate {

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) { }

  canActivate() {
    const token = localStorage.getItem("token");

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }

    this.router.navigate(["home"])

    return false;
  }
}