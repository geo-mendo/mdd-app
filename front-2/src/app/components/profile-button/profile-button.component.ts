import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from 'src/app/infrastructure/routes/routes';

@Component({
  selector: 'app-profile-button',
  templateUrl: './profile-button.component.html',
})
export class ProfileButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToProfilePage() {
    this.router.navigate([RoutesEnum.PROFILE]);
  }

}
