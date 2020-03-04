import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent } from './users/users.component';
import { PostsComponent } from './posts/posts.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './pages.state';
import { PostsEffects } from './posts/posts.effects';

@NgModule({
  declarations: [PagesComponent, DashboardComponent, UsersComponent, PostsComponent],
  imports: [
    SharedModule,
    PagesRoutingModule,

    // ngrx
    StoreModule.forFeature('pages', reducers),
    EffectsModule.forFeature([
      PostsEffects
    ]),
  ]
})
export class PagesModule { }
