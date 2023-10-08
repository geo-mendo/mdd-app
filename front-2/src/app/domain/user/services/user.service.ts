import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from 'src/app/infrastructure/repositories/User.repository';
import { UserEntity } from '../User.entity';

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

}
