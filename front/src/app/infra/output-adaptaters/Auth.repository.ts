import { Observable } from "rxjs";
import { HttpDataSource } from "src/app/infra/data/dataSources/HttpDataSource";
import { AuthSuccess } from "src/app/infra/data/dtos/authSuccess.interface";
import { LoginRequest } from "src/app/infra/data/dtos/loginRequest.interface";
import { RegisterRequest } from '../data/dtos/registerRequest.interface';
import { IAuthRepository } from "src/app/domain/output-ports/IAuthRepository";
import { LSDataSource } from "../data/dataSources/LSDataSource";
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

    public login(loginRequest: LoginRequest):Observable<AuthSuccess> {
        return this.datasource.post(`${this.authPath}/login`, loginRequest)
    }

    public signup (signupRequest: RegisterRequest): Observable<AuthSuccess> {
        return this.datasource.post(`${this.authPath}/signup`,signupRequest)
    }

    public setToken(authToken: string){
        this.storageSource.setItem("authToken",authToken)
    }

    public getToken(){
        return this.storageSource.getItem("authToken")
    }
}