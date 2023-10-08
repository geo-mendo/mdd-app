import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/infrastructure/routes/routes';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit() {
  }

  goToHomePage() {
    return this.router.navigateByUrl(RoutesEnum.HOME)
  }

}
