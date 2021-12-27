import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent {
  invalidLogin: boolean;
  accountForm: FormGroup;
  @ViewChild('closebutton') closebutton;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private userService: UserService,
    private appComponent: AppComponent
  ) { 
    this.accountForm = this.formbuilder.group({
      userName: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(8)]]      
    })
  }

  async createUser() {
    const user: User = {
      email: this.accountForm.get('email').value,
      userName: this.accountForm.get('userName').value,
      password: this.accountForm.get('password').value
    }

    this.userService.createUser(user).subscribe(Response => {
      const token = (<any> Response).token;
      localStorage.setItem("token", token);
      this.invalidLogin = false;
      this.router.navigate(["/home"]);
      this.toastr.success('Se registro con exito', 'Registro completo');
      this.closebutton.nativeElement.click();
      this.appComponent.IsLogged = true;
      this.accountForm.reset();
    }, error => {
      this.invalidLogin = true;
      this.toastr.error(error.error, 'Error');
    })
  }
}