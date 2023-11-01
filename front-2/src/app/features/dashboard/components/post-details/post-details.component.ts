import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs';
import { CommentsService } from 'src/app/domain/comments/services/Comments.service';
import { PostEntity } from 'src/app/domain/posts/Post.entity';
import { PostsService } from 'src/app/domain/posts/services/Posts.service';
import { UserService } from 'src/app/domain/user/services/user.service';
import { ICreateComment } from 'src/app/infrastructure/dtos/comments/ICreateComment';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
})
export class PostDetailsComponent implements OnInit {

  public post: PostEntity | undefined ;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly postService: PostsService,
    private readonly fb: FormBuilder,
    private readonly notifierService: NotifierService,
    private readonly commentService: CommentsService,
    private readonly userService: UserService,
  ) {}

  public form = this.fb.group({
      comment: ['',[Validators.required, Validators.minLength(3)]],
  });

  ngOnInit() {
    const paramId = this.route.snapshot.paramMap.get('id')!;
    const postId = Number(paramId);
    if(!postId || isNaN(postId)) {
      this.notifierService.notify('error', 'Post not found');
      return;
    }
    this.postService.getPostById(postId)
    .pipe(take(1))
    .subscribe(post => this.post = post);
  }

  public backToFeed() {
    window.history.back();
  }

  public createComment() {
    if(this.form.invalid) {
      this.notifierService.notify('error', 'Comment must be at least 10 characters long');
      return;
    }
    const comment: ICreateComment = {
      content: this.form.value.comment as string,
      postId: this.post!.id as number,
    };

    this.commentService.createNewComment(comment).subscribe({
      next: (comment) => {
          this.notifierService.notify('success', 'Comment created successfully');
          this.post!.comments.push(comment);
          this.form.reset();
      },
      error: () => this.notifierService.notify('error', 'Error while creating comment'),
    })
  }

}
