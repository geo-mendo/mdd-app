import { Injectable } from "@angular/core";
import { IUserRepository } from "src/app/domain/user/ports/IUserRepository";
import { HttpDataSource } from "../dataSources/HttpDataSource";
import { LSDataSource } from "../dataSources/LSDataSource";
import { AuthRepository } from "./Auth.repository";
import { Observable } from "rxjs";
import { UserEntity } from '../../domain/user/User.entity';
import { ApiRoutes } from "../routes/routes";
import { IHttpParam } from "../dataSources/interface";
import { IUpdateProfile } from "../dtos/user/IUpdateProfile";

@Injectable({
    providedIn: 'root'
})
export class UserRepository implements IUserRepository{
    constructor(
        private datasource: HttpDataSource,
    ) { }

    getCurrentuser(): Observable<UserEntity> {
        return this.datasource.get(ApiRoutes.CURRENT_USER)
    }

    addSubscriptionToTopic(userId: number, topicId: number): Observable<UserEntity> {
        return this.datasource.post(ApiRoutes.ADD_SUBSCRIPTION, {userId,topicId})
    }

    removeSubscriptionToTopic(topicId: number): Observable<Object> {
     
        return this.datasource.delete(`${ApiRoutes.REMOVE_SUBSCRIPTION}/${topicId}`)
    }

    updateProfil(profil: IUpdateProfile, userId: number): Observable<UserEntity> {
        return this.datasource.put(`${ApiRoutes.PROFILE}/${userId}`, profil)
    }
}