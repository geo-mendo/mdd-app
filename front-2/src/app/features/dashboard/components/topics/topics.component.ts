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

  constructor(
    private readonly topicsService: TopicsService,
    private readonly userService: UserService,
    private readonly notifService: NotifierService
    ) { }

  ngOnInit() {
  }

  public subscribeToTopic(topicId: number | undefined){
    this.userService.addSubscriptionToTopic(topicId as number).subscribe({
      next: success => {
        this.notifService.notify('success', 'Topic subscribed');
      },
      error: error => {
        this.notifService.notify('error', 'Error subscribing to topic');
      }
    })
  }

  public isAlreadySubscribed(topicId: number | undefined, userSubscription: TopicEntity[]): boolean {
    if(!userSubscription || userSubscription.length === 0) {
      return false;
    }
    return userSubscription.some(topic => topic.id === topicId);
  }

}
