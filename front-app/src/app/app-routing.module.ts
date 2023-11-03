import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PathEnum } from './infrastructure/routes/routes';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RedirectIfLoggedGuard } from './guards/redirectIfLogged.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { 
    title: 'Accueil',
    path: PathEnum.HOME,
    canActivate: [RedirectIfLoggedGuard], 
    component: HomeComponent,
  },
  {
    path: PathEnum.AUTH,
    canActivate: [RedirectIfLoggedGuard], 
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: PathEnum.DASHBOARD,
    canActivate: [AuthGuard], 
    loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    title: 'Page 404',
    path: PathEnum.NOT_FOUND,
    component: NotFoundComponent,
  },
  {
    path: '**',
    redirectTo: PathEnum.NOT_FOUND,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
