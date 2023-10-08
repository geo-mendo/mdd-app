import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppNavbarComponent } from './components/app-navbar/app-navbar.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AppDrawerComponent } from './components/app-drawer/app-drawer.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ProfileButtonComponent } from './components/profile-button/profile-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AppDrawerComponent,
    AppNavbarComponent,
    NavMenuComponent,
    ProfileButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
