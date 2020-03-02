import { ActionReducerMap } from '@ngrx/store';
import { postsReducer } from '../pages/posts/posts.reducer';
import { IPostState } from '../pages/posts/posts.model';

export const reducers: ActionReducerMap<AppState> = {
  posts: postsReducer,
}

export interface AppState {
  posts: IPostState
}
