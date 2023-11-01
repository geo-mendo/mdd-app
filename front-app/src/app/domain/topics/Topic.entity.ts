import { PostEntity } from "../posts/Post.entity";

export class TopicEntity {
    id?: number;
    title: string;
    description: string;
    posts: PostEntity[];

    constructor(title: string, description: string, posts: PostEntity[]) {
        this.title = title;
        this.description = description;
        this.posts = posts;
    }
}