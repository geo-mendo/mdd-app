import { CommentEntity } from "../comments/Comment.entity";
import { TopicEntity } from "../topics/Topic.entity";
import { UserEntity } from "../user/User.entity";

export class PostEntity {
    id?: number;
    title: string;
    content: string;
    author: UserEntity;
    topic : TopicEntity;
    comments: CommentEntity[];
    createdAt?: Date;

    constructor(title: string, content: string, topic: TopicEntity, author: UserEntity , comments: CommentEntity[]) {
        this.title = title;
        this.content = content;
        this.topic = topic;
        this.author = author;
        this.comments = comments;
    }
}