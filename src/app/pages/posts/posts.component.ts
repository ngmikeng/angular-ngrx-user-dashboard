import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { flatMap, tap, map } from 'rxjs/operators';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';
import { IPost } from '../../shared/models/post.model';
import { Store, select } from '@ngrx/store';
import * as postsAction from './posts.action';
import { State } from '../pages.state';
import { selectPostsPageItems, selectPostsItemsLength, selectPostsSelectAllState, selectPostsSelectedItems } from './posts.selectors';
import { ISelectedAllState } from './posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  selection = new SelectionModel<IPost>(true, []);
  listPosts$: Observable<IPost[]> = this.store.pipe(select(selectPostsPageItems))
    .pipe(tap(res => {
      this.selection.clear();
    }));
  totalItems$: Observable<number> = this.store.pipe(select(selectPostsItemsLength))
  selectedAllState$: Observable<ISelectedAllState> = this.store.pipe(select(selectPostsSelectAllState))
  selectedItems$: Observable<IPost[]> = this.store.pipe(select(selectPostsSelectedItems));

  currentPage: number = 1;
  limitPerPage: number = PAGINATION_PAGE_SIZE;
  selectedItems: IPost[] = [];

  constructor(
    private store: Store<State>,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.store.dispatch(postsAction.actionPostsGetItems({
      page: this.currentPage,
      limit: this.limitPerPage,
      isGetAll: true
    }));
    this.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });
  }

  changePageHandler(page: number) {
    this.currentPage = page;
    this.store.dispatch(postsAction.actionPostsGetItems({
      page: this.currentPage,
      limit: this.limitPerPage,
      isGetAll: false
    }));
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
    console.log(this.selection.selected);
  }

}
