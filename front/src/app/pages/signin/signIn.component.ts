import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginUsecase } from 'src/app/domain/usecases/Auth/loginUsecase.service';
import { LoginRequest } from 'src/app/infra/data/dtos/loginRequest.interface';

@Component({
  selector: 'app-signIn',
  templateUrl: './signIn.component.html',
})
export class SignInComponent {

  public error = false ;

  constructor(
    private loginUsecase: LoginUsecase,
    private formBuilder : FormBuilder
  ) { }

  public form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.min(3)]]
  });


  public handleSubmit(){
    try {
      const loginRequest = this.form.value as LoginRequest;
      this.loginUsecase.execute(loginRequest)
    } catch (error) {
      this.error = true
    }
  }
  

}
