import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/infra/routes/routes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  routes: typeof RoutesEnum;

  constructor(
    private readonly router: Router,
  ) {
    this.routes = RoutesEnum;
  }


  ngOnInit(): void {}

  goToSignInPage() {
    return this.router.navigateByUrl(RoutesEnum.SIGNIN)
  }

  goToSignUpPage() {
    return this.router.navigateByUrl(RoutesEnum.SIGNUP)
  }

}
