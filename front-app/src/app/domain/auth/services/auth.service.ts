import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRepository } from 'src/app/infrastructure/repositories/Auth.repository';
import { AuthSuccess } from '../../../infrastructure/dtos/auth/authSuccess.interface';
import { ISigninRequest } from '../../../infrastructure/dtos/auth/ISigninRequest.interface';
import { RoutesEnum } from 'src/app/infrastructure/routes/routes';
import { ISignupRequest } from '../../../infrastructure/dtos/auth/ISignupRequest.interface';
import { UserRepository } from 'src/app/infrastructure/repositories/User.repository';
import { UserService } from '../../user/services/user.service';
import { UserEntity } from '../../user/User.entity';
import { Observable, catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(
  private authRepository: AuthRepository,
  private userService: UserService,
  private router: Router
) { }

  public signin(request: ISigninRequest) {
    this.authRepository.signin(request).subscribe(
            (response: AuthSuccess) => {
                this.authRepository.setToken(response.token);
                this.router.navigate([RoutesEnum.DASHBOARD])
            },
            error => {
                throw new Error("User not found")
            }
        )
  }

   public signup(request: ISignupRequest) {
    this.authRepository.signup(request).subscribe(
            (response: AuthSuccess) => {
                this.authRepository.setToken(response.token);
                this.router.navigate([RoutesEnum.DASHBOARD])
            },
            error => {
                throw new Error("User not found")
            }
        )
  }

  public verifyUser(): Observable<boolean> {
    return this.userService.getCurrentUser().pipe(
      map((user: UserEntity) => Boolean(user)),
      catchError((error) => {
        return of(error);
      })
    )
  }

  public isLogged():Observable<boolean> {
    const token = this.authRepository.getToken();
    if(token) {
      return this.verifyUser();
    }
    return of(false);
  }

  public logOut() {
    this.authRepository.removeToken();
    this.router.navigate([RoutesEnum.HOME])
  }

}
