import { Observable } from "rxjs";
import { CommentEntity } from "../Comment.entity";
import { ICreateComment } from "src/app/infrastructure/dtos/comments/ICreateComment";

export interface ICommentRepository {
    getAllCommentsByPostId(postId: number): Observable<CommentEntity[]>;
    createNewComment(newComment: ICreateComment): Observable<CommentEntity>;
}