import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PathEnum } from "src/app/infrastructure/routes/routes";
import { FeedComponent } from "./components/feed/feed.component";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { PostDetailsComponent } from "./components/post-details/post-details.component";
import { TopicsComponent } from "./components/topics/topics.component";
import { ProfilComponent } from "./components/profil/profil.component";

const routes: Routes = [
    { title:"Mon fil d'article", path: PathEnum.POSTS_FEED, component: FeedComponent  },
    { title:"Ajouter un article", path: PathEnum.NEW_POST, component: NewPostComponent },
    { title:"Détail d'un article", path: PathEnum.POST_DETAILS, component: PostDetailsComponent },
    { title:"Les thèmes", path: PathEnum.TOPICS, component: TopicsComponent  },
    { title:"Mes abonnements et informations", path: PathEnum.PROFILE, component: ProfilComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
