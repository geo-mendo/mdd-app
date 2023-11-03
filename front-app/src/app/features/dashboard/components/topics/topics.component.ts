import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { TopicEntity } from 'src/app/domain/topics/Topic.entity';
import { TopicsService } from 'src/app/domain/topics/services/Topics.service';
import { UserService } from 'src/app/domain/user/services/user.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
})
export class TopicsComponent implements OnInit {

  public topics$ = this.topicsService.getAllTopics();
  public user$ = this.userService.getCurrentUser();
  public isJustSubscribedTopicId!: number;
  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService,
    private readonly notifService: NotifierService
    ) { }

  ngOnInit() {
  }

  public subscribeToTopic(userID:number | undefined ,topicId: number | undefined){
    this.userService.addSubscriptionToTopic(userID as number,topicId as number).subscribe({
      next: success => {
        this.notifService.notify('success', 'Topic subscribed');
        this.isJustSubscribedTopicId = topicId as number;
      },
      error: error => {
        this.notifService.notify('error', 'Error subscribing to topic');
      }
    })
  }

  public canSubscribe(topicId: number | undefined, userSubscription: TopicEntity[]): boolean {
    return !this.isAlreadySubscribed(topicId, userSubscription) && !(this.isJustSubscribedTopicId === topicId);
  }

  public isAlreadySubscribed(topicId: number | undefined, userSubscription: TopicEntity[]): boolean {
    if(!userSubscription || userSubscription.length === 0) {
      return false;
    }
    return userSubscription.some(topic => topic.id === topicId);
  }

}
