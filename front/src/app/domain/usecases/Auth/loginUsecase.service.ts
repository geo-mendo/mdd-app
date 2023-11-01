import { HttpDataSource } from "src/app/infra/data/dataSources/HttpDataSource";
import { LoginRequest } from '../../../infra/data/dtos/loginRequest.interface';
import { AuthRepository } from "src/app/infra/output-adaptaters/Auth.repository";
import { AuthSuccess } from "src/app/infra/data/dtos/authSuccess.interface";
import { Router } from "@angular/router";
import { Injectable } from '@angular/core';

Injectable({
    providedIn: 'root'
})
export class LoginUsecase  {
    constructor(
        private repository: AuthRepository,
        private router: Router
        ){}


    execute(request: LoginRequest){
        this.repository.login(request).subscribe(
            (response: AuthSuccess) => {
                this.repository.setToken(response.token);
                this.router.navigate([])
            },
            error => {
                throw new Error("User not found")
            }
        )
    };

}