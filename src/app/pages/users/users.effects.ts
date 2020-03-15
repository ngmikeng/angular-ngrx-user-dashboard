import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, filter } from 'rxjs/operators';
import { UsersService } from '../../shared/services/users.service';
import * as usersAction from './users.actions';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private usersService: UsersService
  ) { }

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATION, usersAction.actionUsersGetItems),
      filter((n: any) => {
        return n.payload.routerState.url.indexOf('users') > -1
      }),
      mergeMap((action) => {
        const page = action.payload.routerState.queryParams.page * 1 || 1;
        const limit = PAGINATION_PAGE_SIZE;
        return this.usersService.getAll(page, limit)
          .pipe(
            map(users => (
              usersAction.actionUsersGetItemsSucceed({users, page: page})
            )),
            catchError(() => of({ type: '[Users] Get items error' }))
          )
      }
    )
  ));

  getTotalItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(usersAction.actionUsersGetTotalItems),
      mergeMap((action) => {
        return this.usersService.getAll()
          .pipe(
            map(users => (
              usersAction.actionUsersGetTotalItemsSucceed({ users, total: users.length })
            )),
            catchError(() => of({ type: '[Users] Get items error' }))
          )
      }
    )
  ));

}
