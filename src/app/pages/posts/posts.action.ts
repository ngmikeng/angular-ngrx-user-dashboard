import { createAction, props } from '@ngrx/store';
import { IPost } from '../../shared/models/post.model';


export const actionPostsGetItems = createAction(
  '[Posts] Get items',
  props<{ page: number, limit: number, isGetAll: boolean }>()
);

export const actionPostsGetItemsSucceed = createAction(
  '[Posts] Get items succeed',
  props<{ posts: IPost[], isGetAll: boolean, page: string }>()
);

export const actionPostsToggleSelectItem = createAction(
  '[Posts] Toggle select item',
  props<{ item: IPost }>()
);

export const actionPostsToggleSelectAll = createAction(
  '[Posts] Toggle select all',
  props<{ }>()
);
