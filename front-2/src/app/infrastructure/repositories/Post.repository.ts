import { Injectable } from '@angular/core';
import { HttpDataSource } from '../dataSources/HttpDataSource';
import { ApiRoutes, RoutesEnum } from '../routes/routes';
import { Observable } from 'rxjs';
import { PostEntity } from 'src/app/domain/posts/Post.entity';
import { IHttpParam } from '../dataSources/interface';
import { ICreatePost } from '../dtos/posts/ICreatePost';
import { IPostRepository } from 'src/app/domain/posts/ports/IPostRepository';


@Injectable({
    providedIn: 'root'
})
export class PostRepository implements IPostRepository {

    constructor(
        private dataSource: HttpDataSource
    ) { }

    getAllPostsByUserFeed(): Observable<PostEntity[]> {
        return this.dataSource.get(ApiRoutes.POSTS)
    }

    getPostById(postId: number): Observable<PostEntity> {
        const param: IHttpParam = {
            name: 'postId',
            value: postId
        }
        return this.dataSource.getWithParams(ApiRoutes.POSTS, [param])
    }

    createNewPost(post: ICreatePost): Observable<PostEntity> {
        return this.dataSource.post(ApiRoutes.POSTS, post)
    }
}