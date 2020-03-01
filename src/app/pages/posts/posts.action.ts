import { createAction, props } from '@ngrx/store';
import { IPost } from '../../shared/models/post.model';


export const actionPostsGetItems = createAction(
  '[Posts] Get items',
  props<{ posts: IPost[] }>()
);
