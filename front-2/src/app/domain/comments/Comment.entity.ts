import { PostEntity } from "../posts/Post.entity";
import { UserEntity } from "../user/User.entity";

export class CommentEntity {
    id?: number;
    content: string;
    postId: number;
    user: UserEntity;
    createdAt?: Date;

    constructor(content: string, postId: number, user: UserEntity) {
        this.content = content;
        this.postId = postId;
        this.user = user;
    }
}