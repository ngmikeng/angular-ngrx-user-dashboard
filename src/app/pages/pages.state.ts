import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { IPostState } from './posts/posts.model';
import { postsReducer } from './posts/posts.reducer';
import { AppState } from '../core/core.state';

export const FEATURE_NAME = 'pages';

export interface IPagesState {
  posts: IPostState
}

export const selectPages = createFeatureSelector<State, IPagesState>(FEATURE_NAME);

export const reducers: ActionReducerMap<IPagesState> = {
  posts: postsReducer,
}

export interface State extends AppState {
  pages: IPagesState
}
