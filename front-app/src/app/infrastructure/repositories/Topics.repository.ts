import { Injectable } from "@angular/core";
import { HttpDataSource } from "../dataSources/HttpDataSource";
import { ApiRoutes } from "../routes/routes";
import { IHttpParam } from "../dataSources/interface";
import { ITopicsRepository } from "src/app/domain/topics/ports/ITopicsRepository";
import { TopicEntity } from "src/app/domain/topics/Topic.entity";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class TopicsRepository implements ITopicsRepository{

    constructor(private datasource: HttpDataSource) {}

    getAllTopics(): Observable<TopicEntity[]> {
        return this.datasource.get<TopicEntity[]>(ApiRoutes.TOPICS)
    }

    getAllTopicsByUserId(userId: number): Observable<TopicEntity[]>  {
        const param: IHttpParam = {
            name: 'userId',
            value: userId
        }
        return this.datasource.getWithParams<TopicEntity[]>(ApiRoutes.TOPICS,[param])
    }

}