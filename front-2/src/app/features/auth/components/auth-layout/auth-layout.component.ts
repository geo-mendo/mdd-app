import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
})
export class AuthLayoutComponent implements OnInit {

  title!:string;

  constructor(
    private router: Router,
    private currentRoute: ActivatedRoute
    ) { }

  ngOnInit() {
    this.currentRoute.snapshot.url[0].path === 'signin' ? this.title = 'Se connecter' : this.title = "S'enregistrer"
  }

   public backToHome(){
    this.router.navigate([''])
  }

}
