import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { IPostState } from './posts/posts.model';
import { IUserState } from './users/users.model';
import { postsReducer } from './posts/posts.reducer';
import { usersReducer } from './users/users.reducer';
import { AppState } from '../core/core.state';

export const FEATURE_NAME = 'pages';

export interface IPagesState {
  posts: IPostState,
  users: IUserState
}

export interface ISelectedAllState {
  isSelectedAll: boolean,
  isIndeterminate: boolean
}

export const selectPages = createFeatureSelector<State, IPagesState>(FEATURE_NAME);

export const reducers: ActionReducerMap<IPagesState> = {
  posts: postsReducer,
  users: usersReducer
}

export interface State extends AppState {
  pages: IPagesState
}
