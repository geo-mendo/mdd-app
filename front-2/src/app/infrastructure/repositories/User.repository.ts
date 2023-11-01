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

    addSubscriptionToTopic(topicId: number): Observable<UserEntity> {
        return this.datasource.post(ApiRoutes.SUBSCRIPTIONS, {topicId})
    }

    removeSubscriptionToTopic(topicId: number): Observable<Object> {
        const param: IHttpParam = {
            name: 'topicId',
            value: topicId
        }
        return this.datasource.delete(ApiRoutes.SUBSCRIPTIONS, [param])
    }

    updateProfil(profil: IUpdateProfile): Observable<UserEntity> {
        return this.datasource.put(ApiRoutes.PROFILE, profil)
    }
}