import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { PostEntity } from 'src/app/domain/posts/Post.entity';
import { PostsService } from 'src/app/domain/posts/services/Posts.service';
import { PathEnum, RoutesEnum } from 'src/app/infrastructure/routes/routes';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
})
export class FeedComponent implements OnInit {

  public posts$ = this.postService.getAllPostsByUserFeed() ;

  constructor(
    private readonly postService: PostsService,
    private router: Router
    ) { }

  ngOnInit() {}


  public goToCreatePostFormPage(){
    this.router.navigate([RoutesEnum.NEW_POST]);
  }

  public showPostDetails(postId: number | undefined){
    this.router.navigate([RoutesEnum.POST_DETAILS, postId]);
  }


}
