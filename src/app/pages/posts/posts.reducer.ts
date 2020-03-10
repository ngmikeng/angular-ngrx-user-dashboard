import { IPostState } from './posts.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as postsAction from './posts.action';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';

export const initialState: IPostState = {
  items: [],
  pageItems: [],
  selectedItems: [],
  page: 1,
  total: 0
};

const reducer = createReducer(
  initialState,
  on(postsAction.actionPostsGetItems, (state, payload) => ({
    ...state
  })),
  on(postsAction.actionPostsGetTotalItems, (state, payload) => ({
    ...state
  })),
  on(postsAction.actionPostsGetItemsSucceed, (state, payload) => {
    return {
      ...state,
      pageItems: payload.posts,
      page: payload.page
    }
  }),
  on(postsAction.actionPostsGetTotalItemsSucceed, (state, payload) => {
    return {
      ...state,
      items: payload.posts,
      total: payload.total
    }
  }),
  on(postsAction.actionPostsToggleSelectItem, (state, payload) => {
    let selectedItems = [...state.selectedItems];
    const checkedItem = selectedItems.find(item => item.id === payload.item.id);
    if (checkedItem) {
      selectedItems = selectedItems.filter(item => item.id !== payload.item.id);
    } else {
      selectedItems.push(payload.item);
    }

    return {
      ...state,
      selectedItems: selectedItems
    }
  }),
  on(postsAction.actionPostsToggleSelectAll, (state, payload) => {
    let selectedItems = [...state.selectedItems];
    const curPageIds = state.pageItems.map(item => item.id);
    const selectedItemsInPage = state.selectedItems.filter(item => curPageIds.includes(item.id));
    const isSelectedAll = selectedItemsInPage.length === state.pageItems.length;
    if (isSelectedAll) {
      selectedItems = state.selectedItems.filter(item => !curPageIds.includes(item.id));
    } else {
      selectedItems = state.selectedItems.filter(item => !curPageIds.includes(item.id));
      selectedItems = [...selectedItems, ...state.pageItems];
    }

    return {
      ...state,
      selectedItems: selectedItems
    }
  }),
)

export function postsReducer(state: IPostState | undefined, action: Action) {
  return reducer(state, action);
}
