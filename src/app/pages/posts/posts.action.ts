import { createAction, props } from '@ngrx/store';
import { IPost } from '../../shared/models/post.model';


export const actionPostsGetItems = createAction(
  '[Posts] Get items',
  props<{ page: number, limit: number }>()
);

export const actionPostsGetItemsSucceed = createAction(
  '[Posts] Get items succeed',
  props<{ posts: IPost[], page: number }>()
);

export const actionPostsGetTotalItems = createAction(
  '[Posts] Get total items'
);

export const actionPostsGetTotalItemsSucceed = createAction(
  '[Posts] Get total items succeed',
  props<{ posts: IPost[], total: number }>()
);

export const actionPostsToggleSelectItem = createAction(
  '[Posts] Toggle select item',
  props<{ item: IPost }>()
);

export const actionPostsToggleSelectAll = createAction(
  '[Posts] Toggle select all',
  props<{ }>()
);
