import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../../domain/auth/services/auth.service';
import { ISignupRequest } from '../../../../infrastructure/dtos/auth/ISignupRequest.interface';
import { passwordValidator } from 'src/app/domain/auth/password.validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  public error = false;

  public form = this.fb.group({
    username: ['', [Validators.required, Validators.min(3) , Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordValidator()]]
  });

  ngOnInit() {
  }

  public handleSubmit() {
    try {
      const signupRequest = this.form.value as ISignupRequest
      this.authService.signup(signupRequest)
    } catch (error) {
      this.error = true
    }
  }

}
