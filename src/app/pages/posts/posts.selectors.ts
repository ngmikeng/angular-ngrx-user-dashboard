import { createSelector } from '@ngrx/store';
import { selectPages, IPagesState } from '../pages.state';
import { IPostState } from './posts.model';

export const selectPostsState = createSelector(
  selectPages,
  (state: IPagesState) => state.posts
)

export const selectPostsItems = createSelector(
  selectPostsState,
  (state: IPostState) => state.items
)

export const selectPostsItemsLength = createSelector(
  selectPostsItems,
  (items) => items.length
)

export const selectPostsPageItems = createSelector(
  selectPostsState,
  (state: IPostState) => state.pageItems
)

export const selectPostsSelectedItems = createSelector(
  selectPostsState,
  (state: IPostState) => state.selectedItems
)

export const selectPostsSelectAllState = createSelector(
  selectPostsPageItems,
  selectPostsSelectedItems,
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
