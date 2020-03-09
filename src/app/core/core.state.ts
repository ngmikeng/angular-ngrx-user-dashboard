import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { postsReducer } from '../pages/posts/posts.reducer';
import { IPostState } from '../pages/posts/posts.model';
import { RouterReducerState, routerReducer } from '@ngrx/router-store';
import { RouterStateUrl } from './router/router.state';

export const reducers: ActionReducerMap<AppState> = {
  posts: postsReducer,
  router: routerReducer
}

export const selectRouterState = createFeatureSelector<
  AppState,
  RouterReducerState<RouterStateUrl>
>('router');

export interface AppState {
  posts: IPostState;
  router: RouterReducerState<RouterStateUrl>;
}
