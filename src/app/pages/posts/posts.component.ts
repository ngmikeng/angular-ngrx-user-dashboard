import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { flatMap, tap, map } from 'rxjs/operators';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';
import { IPost } from '../../shared/models/post.model';
import { Store, select } from '@ngrx/store';
import * as postsAction from './posts.action';
import { IPostState } from './posts.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  selection = new SelectionModel<IPost>(true, []);
  listPosts$: Observable<IPost[]> = this.store.pipe(select('posts'))
    .pipe(tap(res => {
      this.totalItems = res.items.length;
      this.selection.clear();
      console.log(res)
    }))
    .pipe(map(state => {
      console.log(state)
      return state.pageItems;
    }))

  currentPage: number = 1;
  limitPerPage: number = PAGINATION_PAGE_SIZE;
  totalItems: number;

  private _pageItems: BehaviorSubject<IPost[]> = new BehaviorSubject([]);

  get pageItems() {
    return this._pageItems.asObservable();
  }

  constructor(
    private store: Store<{ posts: IPostState }>,
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.store.dispatch(postsAction.actionPostsGetItems({
      page: this.currentPage,
      limit: this.limitPerPage,
      isGetAll: true
    }));
  }

  changePageHandler(page: number) {
    this.currentPage = page;
    this.store.dispatch(postsAction.actionPostsGetItems({
      page: this.currentPage,
      limit: this.limitPerPage,
      isGetAll: false
    }));
  }

  getListPostsPaging(curPage: number = 1) {
    const limit = PAGINATION_PAGE_SIZE;
    return this.postsService.getAll(curPage, limit).pipe(flatMap(res => {
      return of(res);
    }));
  }

  toggleSelectAllItem(event?, id?) {
    if (this.isAllSelected()) {
      this.selection.clear()
    } else {
      const newItems = this._pageItems.getValue().map(row => {
        this.selection.select(row);
        return row;
      });
    }
  }

  isAllSelected() {
    const items = this._pageItems.getValue();
    const numSelected = this.selection.selected.length;
    const numRows = items.length;
    return numSelected === numRows;
  }

  createItem() {

  }

  deleteItems() {
    console.log(this.selection.selected);
  }

}
