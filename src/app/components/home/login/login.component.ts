import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from '../../../app.component';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../../models/User';
import { HeaderComponent } from '../../master/header/header.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  invalidLogin: boolean;
  show: boolean = false;
  accountForm: FormGroup;
  @ViewChild('closebutton') closebutton;

  constructor(
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private userService: UserService,
    private appComponent: AppComponent,
    private headerComponent: HeaderComponent
    ) 
  {
    this.accountForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {
  }

  async login(form: FormGroup){
    const credentials: User = {
      userName: form.value.userName,
      password: form.value.password
    }

    this.userService.login(credentials).subscribe(Response => {
      const token = (<any> Response).token;
      localStorage.setItem("token", token);
      this.invalidLogin = false;
      this.toastr.success('Inicio de sesión exitoso', 'Acceso concedido');
      this.closebutton.nativeElement.click();
      this.appComponent.IsLogged = true;
      this.headerComponent.getDataUser();
    }, error => {
      this.invalidLogin = true;
      this.toastr.error(error.error, 'Error');
    })
  }

  ShowPassword() {
    this.show = !this.show;
    if(this.show){
      document.getElementById("password").setAttribute("type","text");
    }
    else{
      document.getElementById("password").setAttribute("type","password");
    }
  }
}