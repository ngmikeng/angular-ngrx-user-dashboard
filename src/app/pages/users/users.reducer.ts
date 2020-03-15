import { IUserState } from './users.model';
import { createReducer, on, Action } from '@ngrx/store';
import * as usersAction from './users.actions';

export const initialState: IUserState = {
  items: [],
  pageItems: [],
  selectedItems: [],
  page: 1,
  total: 0
};

const reducer = createReducer(
  initialState,
  on(usersAction.actionUsersGetItems, (state, payload) => ({
    ...state
  })),
  on(usersAction.actionUsersGetTotalItems, (state, payload) => ({
    ...state
  })),
  on(usersAction.actionUsersGetItemsSucceed, (state, payload) => {
    return {
      ...state,
      pageItems: payload.users,
      page: payload.page
    }
  }),
  on(usersAction.actionUsersGetTotalItemsSucceed, (state, payload) => {
    return {
      ...state,
      items: payload.users,
      total: payload.total
    }
  }),
  on(usersAction.actionUsersToggleSelectItem, (state, payload) => {
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
  on(usersAction.actionUsersToggleSelectAll, (state, payload) => {
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

export function usersReducer(state: IUserState | undefined, action: Action) {
  return reducer(state, action);
}
