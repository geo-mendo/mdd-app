import { Observable } from "rxjs";
import { HttpDataSource } from "src/app/infrastructure/dataSources/HttpDataSource";
import { AuthSuccess } from "src/app/infrastructure/dtos/auth/authSuccess.interface";
import { ISigninRequest } from "src/app/infrastructure/dtos/auth/ISigninRequest.interface";
import { ISignupRequest } from '../dtos/auth/ISignupRequest.interface';
import { IAuthRepository } from "src/app/domain/auth/ports/IAuthRepository";
import { LSDataSource } from "../dataSources/LSDataSource";
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthRepository implements IAuthRepository {

    private authPath = "auth"

    constructor(
        private datasource: HttpDataSource,
        private storageSource: LSDataSource
        ){}

    public signin(loginRequest: ISigninRequest):Observable<AuthSuccess> {
        return this.datasource.post(`${this.authPath}/login`, loginRequest)
    }

    public signup (signupRequest: ISignupRequest): Observable<AuthSuccess> {
        return this.datasource.post(`${this.authPath}/signup`,signupRequest)
    }

    public setToken(authToken: string){
        this.storageSource.setItem("authToken",authToken)
    }

    public getToken(): string | null{
        return this.storageSource.getItem("authToken")
    }
}