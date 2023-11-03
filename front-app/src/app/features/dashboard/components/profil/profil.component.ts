import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { take } from 'rxjs';
import { passwordValidator } from 'src/app/domain/auth/password.validator';
import { AuthService } from 'src/app/domain/auth/services/auth.service';
import { TopicsService } from 'src/app/domain/topics/services/Topics.service';
import { UserEntity } from 'src/app/domain/user/User.entity';
import { UserService } from 'src/app/domain/user/services/user.service';
import { IUpdateProfile } from 'src/app/infrastructure/dtos/user/IUpdateProfile';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
})
export class ProfilComponent implements OnInit {

  public user!: UserEntity;

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly notifService: NotifierService,
    private readonly formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()
    .pipe(take(1))
    .subscribe(user => {
      this.user = user;
      console.log(this.user);
      this.form.patchValue({
        username: user.username,
        email: user.email,
      });
    });
      console.log(this.user);
  }

  public form = this.formBuilder.group({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, passwordValidator]),
  });

  public updateProfil() {
    const profil: IUpdateProfile = {
      username: this.form.value.username as string,
      email: this.form.value.email as string,
      password: this.form.value.password as string,
    }
    this.userService.updateProfil(profil, this.user.id as number).subscribe({
      next: success => {
        this.notifService.notify('success', 'Profil updated successfully');
      },
      error: () => this.notifService.notify('error', 'Error updating profil'),
    });
  }

  public removeSubscriptionToTopic(topicId: number | undefined){
    this.userService.removeSubscriptionToTopic(topicId as number).subscribe({
      next: success => {
        this.notifService.notify('success', 'Subscription removed successfully');
        this.user.subscriptions = this.user.subscriptions.filter(sub => sub.id !== topicId);
      },
      error: () => this.notifService.notify('error', 'Error removing subscription'),
    });
  }

  public logOut() {
    this.authService.logOut();
  }

}
