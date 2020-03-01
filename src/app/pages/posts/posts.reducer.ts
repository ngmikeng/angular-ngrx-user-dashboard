import { IPostState } from './posts.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as postsAction from './posts.action';

export const initialState: IPostState = {
  items: [],
  selectedItems: []
};

const reducer = createReducer(
  initialState,
  on(postsAction.actionPostsGetItems, (state, payload) => ({
    ...state,
    items: [...payload.posts]
  }))
)

export function postsReducer(state: IPostState | undefined, action: Action) {
  return reducer(state, action);
}
