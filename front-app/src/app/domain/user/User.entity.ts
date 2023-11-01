import { TopicEntity } from "../topics/Topic.entity";

export class UserEntity {
    id?:number
    username: string;
    email: string;
    password: string;
    subscriptions: TopicEntity[];

    constructor(username: string, email: string, password: string, subscriptions: TopicEntity[]) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.subscriptions = subscriptions;
    }
}