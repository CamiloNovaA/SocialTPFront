import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {  
  public IsLogged: boolean;

  constructor(
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {}

  ValidateAuthenticate() {
    const token: string = localStorage.getItem("token");    

    if(token && !this.jwtHelper.isTokenExpired(token)){
      return true;
    }
    else{
      return false;
    }
  }

  ngOnInit(){
    this.IsLogged = this.ValidateAuthenticate();
  }

  logOut() {
    localStorage.removeItem("token");
    this.IsLogged = false;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUserId() {
    return this.jwtHelper.decodeToken(this.getToken())?.iss;
  }

  getUserName() {
    return this.jwtHelper.decodeToken(this.getToken())?.aud;
  }
}