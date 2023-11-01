import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { RoutesEnum } from 'src/app/infrastructure/routes/routes';
import { AppNavLink, AppNavLinks } from '../AppNavLinks';
import { filter } from 'rxjs';
console.log(RoutesEnum); 
@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
})
export class AppNavbarComponent implements OnInit {

  hide: boolean = false;
  hideNavMenu: boolean = true;
  routes = RoutesEnum;
  

   constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.pipe(
      filter((event: any) => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
      if (event.url === `/${this.routes.HOME}`) {
        this.hide = true;
      }else {
        this.hide = false;
      }
      if (
        event.url !== `/${this.routes.SIGNIN}` &&
        event.url !== `/${this.routes.SIGNUP}` &&
        event.url !== `/${this.routes.HOME}`
      ) {
        this.hideNavMenu = false;
      }
    });
  }

}
