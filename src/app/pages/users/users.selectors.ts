import { createSelector } from '@ngrx/store';
import { selectPages, IPagesState } from '../pages.state';
import { IUserState } from './users.model';

export const selectUsersState = createSelector(
  selectPages,
  (state: IPagesState) => state.users
)

export const selectUsersItems = createSelector(
  selectUsersState,
  (state: IUserState) => state.items
)

export const selectUsersTotalItems = createSelector(
  selectUsersState,
  (state: IUserState) => state.total
)

export const selectUsersCurrentPage = createSelector(
  selectUsersState,
  (state: IUserState) => state.page
)

export const selectUsersPageItems = createSelector(
  selectUsersState,
  (state: IUserState) => state.pageItems
)

export const selectUsersSelectedItems = createSelector(
  selectUsersState,
  (state: IUserState) => state.selectedItems
)

export const selectUsersSelectAllState = createSelector(
  selectUsersPageItems,
  selectUsersSelectedItems,
  (pageItems, selectedItems) => {
    const curPageIds = pageItems.map(item => item.id);
    const selectedItemsInPage = selectedItems.filter(item => curPageIds.includes(item.id));

    const isSelectedAll = selectedItemsInPage.length === pageItems.length;

    return {
      isSelectedAll: isSelectedAll,
      isIndeterminate: !isSelectedAll && selectedItemsInPage.length > 0
    };
  }
)
