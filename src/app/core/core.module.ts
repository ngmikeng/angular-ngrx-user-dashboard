import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './services';
import { StoreModule } from '@ngrx/store';
import { reducers } from './core.state';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from '../pages/posts/posts.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,

    // ngrx
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      PostsEffects
    ]),
  ],
  providers: [
    ApiService
  ]
})
export class CoreModule { }
