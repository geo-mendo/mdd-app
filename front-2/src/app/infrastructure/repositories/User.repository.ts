import { Injectable } from "@angular/core";
import { IUserRepository } from "src/app/domain/user/ports/IUserRepository";
import { HttpDataSource } from "../dataSources/HttpDataSource";
import { LSDataSource } from "../dataSources/LSDataSource";
import { AuthRepository } from "./Auth.repository";
import { Observable } from "rxjs";
import { UserEntity } from '../../domain/user/User.entity';

@Injectable({
    providedIn: 'root'
})
export class UserRepository implements IUserRepository{
    constructor(
        private datasource: HttpDataSource,
    ) { }

    getCurrentuser(): Observable<UserEntity> {
        return this.datasource.get("/currentUser")
    }
}