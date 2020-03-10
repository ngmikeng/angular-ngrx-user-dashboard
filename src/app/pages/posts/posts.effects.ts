import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, filter, switchMap } from 'rxjs/operators';
import { PostsService } from '../../shared/services/posts.service';
import * as postsAction from './posts.action';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) { }

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION, postsAction.actionPostsGetItems),
      filter((n: any) => {
        return n.payload.routerState.url.indexOf('posts') > -1
      }),
      mergeMap((action) => {
        const page = action.payload.routerState.queryParams.page * 1 || 1;
        const limit = PAGINATION_PAGE_SIZE;
        return this.postsService.getAll(page, limit)
          .pipe(
            map(posts => (
              postsAction.actionPostsGetItemsSucceed({posts, page: page})
            )),
            catchError(() => of({ type: '[Posts] Get items error' }))
          )
      }
    )
  ));

  getTotalItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postsAction.actionPostsGetTotalItems),
      mergeMap((action) => {
        return this.postsService.getAll()
          .pipe(
            map(posts => (
              postsAction.actionPostsGetTotalItemsSucceed({ posts, total: posts.length })
            )),
            catchError(() => of({ type: '[Posts] Get items error' }))
          )
      }
    )
  ));

}
