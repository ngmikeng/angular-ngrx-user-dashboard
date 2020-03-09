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
        const page = action.payload.routerState.queryParams.page;
        const limit = page ? PAGINATION_PAGE_SIZE : undefined;
        const isGetAll = !page;
        return this.postsService.getAll(page, limit)
          .pipe(
            map(posts => (
              postsAction.actionPostsGetItemsSucceed({posts, isGetAll: isGetAll, page: page})
            )),
            catchError(() => of({ type: '[Posts] Get items error' }))
          )
      }
    )
  ));

}
