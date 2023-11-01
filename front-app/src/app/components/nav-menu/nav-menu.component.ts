import { Component, OnInit } from '@angular/core';
import { AppNavLink, AppNavLinks } from '../AppNavLinks';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent implements OnInit {

  navLinks: AppNavLink[] = [];

  constructor() {
    this.navLinks = AppNavLinks;
  }

  ngOnInit() {
  }

}
