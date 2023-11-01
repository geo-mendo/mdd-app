import { Observable } from "rxjs";
import { PostEntity } from "../Post.entity";
import { ICreatePost } from "src/app/infrastructure/dtos/posts/ICreatePost";

export interface IPostRepository {
    getAllPostsByUserFeed(): Observable<PostEntity[]>;
    getPostById(id: number): Observable<PostEntity>;
    createNewPost(post: ICreatePost): Observable<PostEntity>;
}