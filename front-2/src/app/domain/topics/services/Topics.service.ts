import { Injectable } from '@angular/core';
import { AuthRepository } from 'src/app/infrastructure/repositories/Auth.repository';
import { TopicsRepository } from 'src/app/infrastructure/repositories/Topics.repository';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private readonly repository: TopicsRepository) { }

  getAllTopics() {
    return this.repository.getAllTopics()
  }

  getAllTopicsByUserId(userId: number) {
    return this.repository.getAllTopicsByUserId(userId)
  }

}
