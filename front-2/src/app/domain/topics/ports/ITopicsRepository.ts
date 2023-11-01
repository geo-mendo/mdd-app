import { Observable } from "rxjs";
import { TopicEntity } from "../Topic.entity";

export interface ITopicsRepository {
    getAllTopics(): Observable<TopicEntity[]>;
    getAllTopicsByUserId(userId: number): Observable<TopicEntity[]>;
}