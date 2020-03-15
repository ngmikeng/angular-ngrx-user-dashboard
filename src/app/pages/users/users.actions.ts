import { createAction, props } from '@ngrx/store';
import { IUser } from '../../shared/models/user.model';

export const actionUsersGetItems = createAction(
  '[Users] Get items',
  props<{ page: number, limit: number }>()
);

export const actionUsersGetItemsSucceed = createAction(
  '[Users] Get items succeed',
  props<{ users: IUser[], page: number }>()
);

export const actionUsersGetTotalItems = createAction(
  '[Users] Get total items'
);

export const actionUsersGetTotalItemsSucceed = createAction(
  '[Users] Get total items succeed',
  props<{ users: IUser[], total: number }>()
);

export const actionUsersToggleSelectItem = createAction(
  '[Users] Toggle select item',
  props<{ item: IUser }>()
);

export const actionUsersToggleSelectAll = createAction(
  '[Users] Toggle select all',
  props<{ }>()
);
