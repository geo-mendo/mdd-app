import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RoutesEnum } from './infra/routes/routes';
// consider a guard combined with canLoad / canActivate route option
// to manage unauthenticated user to access private routes
const routes: Routes = [
  { path: RoutesEnum.HOME, component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: true})],
})
export class AppRoutingModule {}
