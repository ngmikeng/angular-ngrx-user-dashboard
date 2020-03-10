import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';
import { IPost } from '../../shared/models/post.model';
import { Store, select } from '@ngrx/store';
import * as postsAction from './posts.action';
import { State } from '../pages.state';
import { selectPostsPageItems, selectPostsSelectAllState, selectPostsSelectedItems, selectPostsCurrentPage, selectPostsTotalItems } from './posts.selectors';
import { ISelectedAllState } from './posts.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  listPosts$: Observable<IPost[]> = this.store.pipe(select(selectPostsPageItems));
  totalItems$: Observable<number> = this.store.pipe(select(selectPostsTotalItems));
  selectedAllState$: Observable<ISelectedAllState> = this.store.pipe(select(selectPostsSelectAllState))
  selectedItems$: Observable<IPost[]> = this.store.pipe(select(selectPostsSelectedItems));
  currentPage$: Observable<number> = this.store.pipe(select(selectPostsCurrentPage));

  limitPerPage: number = PAGINATION_PAGE_SIZE;
  selectedItems: IPost[] = [];

  constructor(
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit() {
    // get total items
    this.store.dispatch(postsAction.actionPostsGetTotalItems());
    this.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });
  }

  changePageHandler(page: number) {
    if (page) {
      this.router.navigate(['pages/posts'], {
        queryParams: {
          page: page
        }
      });
    }
  }

  toggleSelectAllItem() {
    this.store.dispatch(postsAction.actionPostsToggleSelectAll({}));
  }

  toggleSelectItem(item: IPost) {
    this.store.dispatch(postsAction.actionPostsToggleSelectItem({ item }));
  }

  isSelectedItem(post: IPost) {
    return !!this.selectedItems.find(item => item.id === post.id);
  }

  createItem() {

  }

  deleteItems() {

  }

}
