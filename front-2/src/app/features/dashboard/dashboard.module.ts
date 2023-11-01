import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedComponent } from './components/feed/feed.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { TopicsComponent } from './components/topics/topics.component';
import { ProfilComponent } from './components/profil/profil.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    FeedComponent,
    PostDetailsComponent,
    NewPostComponent,
    TopicsComponent,
    ProfilComponent
  ]
})
export class DashboardModule { }
