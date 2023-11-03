import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { PostsService } from 'src/app/domain/posts/services/Posts.service';
import { TopicEntity } from 'src/app/domain/topics/Topic.entity';
import { TopicsService } from 'src/app/domain/topics/services/Topics.service';
import { ICreatePost } from 'src/app/infrastructure/dtos/posts/ICreatePost';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
})
export class NewPostComponent implements OnInit {

  public topics$: Observable<TopicEntity[]> = this.topicsService.getAllTopics();

  constructor(
    private readonly formBuilder : FormBuilder,
    private readonly postService: PostsService,
    private readonly notifierService : NotifierService,
    private readonly topicsService: TopicsService
  ) { }

  ngOnInit() {
  }

  public backToFeed() {
    window.history.back();
  }

  public form = this.formBuilder.group({
    topicId: ['',[Validators.required]],
    title: ['',[Validators.required, Validators.minLength(3)]],
    content: ['',[Validators.required, Validators.minLength(50)]],
  });

  public createPost() {
    if(this.form.invalid) {
      this.notifierService.notify('error', 'Post must be at least 50 characters long');
      return;
    }
    const newPost: ICreatePost = {
      topicId: Number(this.form.value.topicId),
      title: this.form.value.title as string,
      content: this.form.value.content as string,
    }
    this.postService.createNewPost(newPost).subscribe({
      next: () => {
        this.notifierService.notify('success', 'Post created successfully');
        this.form.reset();
      },
      error: () => this.notifierService.notify('error', 'Error creating post'),
    });
  }

}
