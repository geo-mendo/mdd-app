import { Observable } from "rxjs";
import { HttpDataSource } from "src/app/infrastructure/dataSources/HttpDataSource";
import { AuthSuccess } from "src/app/infrastructure/dtos/auth/authSuccess.interface";
import { ISigninRequest } from "src/app/infrastructure/dtos/auth/ISigninRequest.interface";
import { ISignupRequest } from '../dtos/auth/ISignupRequest.interface';
import { IAuthRepository } from "src/app/domain/auth/ports/IAuthRepository";
import { LSDataSource } from "../dataSources/LSDataSource";
import { Injectable } from '@angular/core';
import { ApiRoutes, RoutesEnum } from "../routes/routes";

@Injectable({
    providedIn: 'root'
})
export class AuthRepository implements IAuthRepository {


    constructor(
        private datasource: HttpDataSource,
        private storageSource: LSDataSource
        ){}

    public signin(loginRequest: ISigninRequest):Observable<AuthSuccess> {
        return this.datasource.post(ApiRoutes.SIGNIN, loginRequest)
    }

    public signup (signupRequest: ISignupRequest): Observable<AuthSuccess> {
        return this.datasource.post(ApiRoutes.SIGNUP,signupRequest)
    }

    public setToken(authToken: string){
        this.storageSource.setItem("authToken",authToken)
    }

    public getToken(): string | null{
        return this.storageSource.getItem("authToken")
    }

    public removeToken(): void {
        this.storageSource.removeItem("authToken")
    }
}