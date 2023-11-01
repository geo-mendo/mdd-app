import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { PathEnum } from 'src/app/infrastructure/routes/routes';

const routes: Routes = [
    { title:"Se connecter", path: PathEnum.SIGNIN, component: SigninComponent },
    { title:"S'enregistrer", path: PathEnum.SIGNUP, component: SignupComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
