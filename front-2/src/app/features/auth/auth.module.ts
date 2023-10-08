import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SigninComponent,
        SignupComponent,
        AuthLayoutComponent
    ],
    imports: [
        ReactiveFormsModule,
        AuthRoutingModule,
        CommonModule,
    ],
})
export class AuthModule { }
