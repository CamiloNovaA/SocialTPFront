import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../../services/user.service';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { Byte } from '@angular/compiler/src/util';
import { concat } from 'rxjs';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  public userDetails: User;
  unableEdit = true;
  accountForm: FormGroup;
  image: Byte[];
  
  constructor(
    private toastr: ToastrService,
    private formbuilder: FormBuilder,
    private appComponent: AppComponent,
    private router: Router,
    private userService: UserService
  ) {
    this.accountForm = this.formbuilder.group({
      idUser: 0,
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5), Validators.email]],
      password: ['', [Validators.maxLength(20), Validators.minLength(8)]],
      newPassword: ['', [Validators.maxLength(20), Validators.minLength(8)]],
      profilePhoto: ['', [Validators.nullValidator]]
    })
  }

  ngOnInit(): void {
    if(!this.appComponent.IsLogged) {
      this.router.navigate(["home"])
    }

    this.getInfoUser();    
    
    this.accountForm.disable();    
  }

  getInfoUser() {
    this.userService.getInfoUser(this.appComponent.getUserId()).subscribe((res: User) => {
      this.userDetails = res;
      this.accountForm.controls['userName'].setValue(res.userName);
      this.accountForm.controls['email'].setValue(res.email);
    });
  }

  updateAccount() {
    const user: User = {
      idUser: this.userDetails.idUser,
      email: this.accountForm.get('email').value,
      userName: this.accountForm.get('userName').value,
      password: this.accountForm.get('password').value,
      newPassword: this.accountForm.get('newPassword').value,
      profilePhoto: this.image
    }
    
    if(user.password != user.newPassword) {
      this.toastr.warning("Las contraseñas no son iguales", "Alerta")
    }
    else 
    {
      this.update(user);
    }
  }

  onFileSelected(event) {
    if(event.target.files.length > 0) 
     {
      this.image = event.target.files[0];
     }
   }

  update(user: User) {
    this.userService.editUser(user).subscribe(data => {
      this.toastr.success(`Se actualizo el usuario ${user.userName} con exito.`, 'Datos actualizados');
    }, error => {
      this.toastr.error(error.error, 'Error');
    });

    this.disableInputs(true);
  }

  enableInputs() {
    this.accountForm.enable();
    this.unableEdit = false;
  }

  disableInputs(edit?: boolean) {
    this.accountForm.disable();
    this.unableEdit = true;
    if(!edit)
    {
      this.toastr.warning('Se cancelo la modificación del usuario', 'Modificación cancelada');
    }
  }
}