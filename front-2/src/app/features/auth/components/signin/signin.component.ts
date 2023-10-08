import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ISigninRequest } from '../../../../infrastructure/dtos/auth/ISigninRequest.interface';
import { AuthService } from '../../../../domain/auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
})
export class SigninComponent implements OnInit {

   public error = false ;

  constructor(
    private authService: AuthService,
    private formBuilder : FormBuilder
  ) { }

  ngOnInit(): void {
    
  }

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(3)]]
  });


  public handleSubmit(){
    try {
      const loginRequest = this.form.value as ISigninRequest;
      this.authService.signin(loginRequest)
    } catch (error) {
      this.error = true
    }
  }

 

}
