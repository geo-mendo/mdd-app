import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RoutesEnum } from './infra/routes/routes';

const routes: Routes = [
  { path: RoutesEnum.HOME, component: HomeComponent },
];

NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(routes,{ enableTracing: true}),
    BrowserModule,
  ],
  exports: [RouterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
