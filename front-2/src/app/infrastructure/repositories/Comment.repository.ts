import { ICommentRepository } from "src/app/domain/comments/ports/ICommentRepository";
import { HttpDataSource } from "../dataSources/HttpDataSource";
import { ICreateComment } from "../dtos/comments/ICreateComment";
import { ApiRoutes } from "../routes/routes";
import { Observable } from "rxjs";
import { CommentEntity } from "src/app/domain/comments/Comment.entity";
import { IHttpParam } from "../dataSources/interface";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentRepository implements ICommentRepository {
    constructor(private readonly dataSource: HttpDataSource){}
    getAllCommentsByPostId(postId: number): Observable<CommentEntity[]> {
        const param: IHttpParam = {
            name: 'postId',
            value: postId
        }
        return this.dataSource.getWithParams(ApiRoutes.COMMENTS, [param]);
    }
    createNewComment(comment: ICreateComment): Observable<CommentEntity> {
        return this.dataSource.post(ApiRoutes.POSTS, comment);
    }
}