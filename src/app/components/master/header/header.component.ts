import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../models/User';
import { AppComponent } from '../../../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit, OnChanges {
  public userDetails: User;
  logged: boolean;
  idUser: number;
  userName: string;

  constructor(
    private toastr: ToastrService,
    public appComponent: AppComponent,
    private router: Router
  ) { }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.IsLogged();
    console.log(changes);
  }

  ngOnInit(): void {
    this.IsLogged();
    this.getDataUser();
  }

  public getDataUser() {
    this.idUser = this.appComponent.getUserId();
    this.userName = this.appComponent.getUserName();
  }

  IsLogged() {
    this.logged = this.appComponent.ValidateAuthenticate();
  }

  SignOut() {
    this.appComponent.logOut();
    this.toastr.success('Ha cerrado sesión con exito.', 'Se cerro la sesión');
    this.router.navigate(["/home"]);
  }

  goToMyPost() {
    this.router.navigate(["/home"], { queryParams: { userId: this.idUser } })
  }
}
