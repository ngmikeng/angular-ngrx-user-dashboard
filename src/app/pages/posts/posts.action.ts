import { createAction, props } from '@ngrx/store';
import { IPost } from '../../shared/models/post.model';


export const actionPostsGetItems = createAction(
  '[Posts] Get items',
  props<{ page: number, limit: number, isGetAll: boolean }>()
);

export const actionPostsGetItemsSucceed = createAction(
  '[Posts] Get items succeed',
  props<{ posts: IPost[], isGetAll: boolean }>()
);
