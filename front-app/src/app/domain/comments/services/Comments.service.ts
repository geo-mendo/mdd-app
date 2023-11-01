import { Injectable } from '@angular/core';
import { ICreateComment } from 'src/app/infrastructure/dtos/comments/ICreateComment';
import { CommentRepository } from 'src/app/infrastructure/repositories/Comment.repository';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

constructor(private readonly commentRepository: CommentRepository) { }

  getAllCommentsByPostId(postId: number) {
    return this.commentRepository.getAllCommentsByPostId(postId);
  }

  createNewComment(comment: ICreateComment) {
    return this.commentRepository.createNewComment(comment);
  }

}
