import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { PostsService } from '../../shared/services/posts.service';
import * as postsAction from './posts.action';

@Injectable()
export class PostsEffects {

  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) { }

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postsAction.actionPostsGetItems),
      mergeMap((action) => {
        const page = action.isGetAll ? undefined : action.page;
        const limit = action.isGetAll ? undefined : action.limit;
        return this.postsService.getAll(page, limit)
          .pipe(
            map(posts => (
              postsAction.actionPostsGetItemsSucceed({posts, isGetAll: action.isGetAll})
            )),
            catchError(() => of({ type: '[Posts] Get items error' }))
          )
      }
    )
  ));

}
