import { IPostState } from './posts.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as postsAction from './posts.action';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';

export const initialState: IPostState = {
  items: [],
  pageItems: [],
  selectedItems: []
};

const reducer = createReducer(
  initialState,
  on(postsAction.actionPostsGetItems, (state, payload) => ({
    ...state
  })),
  on(postsAction.actionPostsGetItemsSucceed, (state, payload) => {
    return {
      ...state,
      items: payload.isGetAll ? [...payload.posts] : state.items,
      pageItems: payload.isGetAll ? payload.posts.slice(0, PAGINATION_PAGE_SIZE) : [...payload.posts]
    }
  })
)

export function postsReducer(state: IPostState | undefined, action: Action) {
  return reducer(state, action);
}
