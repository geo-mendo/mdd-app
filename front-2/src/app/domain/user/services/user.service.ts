import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from 'src/app/infrastructure/repositories/User.repository';
import { UserEntity } from '../User.entity';
import { IUpdateProfile } from 'src/app/infrastructure/dtos/user/IUpdateProfile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private userRepository: UserRepository
  ) { }

  getCurrentUser(): Observable<UserEntity> {
    return this.userRepository.getCurrentuser()
  }

  addSubscriptionToTopic(topicId: number): Observable<UserEntity> {
    return this.userRepository.addSubscriptionToTopic(topicId)
  }

  removeSubscriptionToTopic(topicId: number): Observable<Object> {
    return this.userRepository.removeSubscriptionToTopic(topicId)
  }

  updateProfil(profil: IUpdateProfile): Observable<UserEntity> {
    return this.userRepository.updateProfil(profil)
  }

}
