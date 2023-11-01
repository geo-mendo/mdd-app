import { Injectable } from '@angular/core';
import { ICreatePost } from 'src/app/infrastructure/dtos/posts/ICreatePost';
import { PostRepository } from 'src/app/infrastructure/repositories/Post.repository';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly postRepository: PostRepository) { }

  getAllPostsByUserFeed() {
    return this.postRepository.getAllPostsByUserFeed()
  }

  getPostById(postId: number) {
    return this.postRepository.getPostById(postId)
  }

  createNewPost(post: ICreatePost) {
    return this.postRepository.createNewPost(post)
  }

}
