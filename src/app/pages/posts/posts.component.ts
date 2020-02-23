import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { flatMap, tap, map } from 'rxjs/operators';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';
import { IPost } from '../../shared/models/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  selection = new SelectionModel<IPost>(true, []);
  listPosts$: Observable<any[]>;
  totalItems: number;

  private _pageItems: BehaviorSubject<IPost[]> = new BehaviorSubject([]);

  get pageItems() {
    return this._pageItems.asObservable();
  }

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
     this.postsService.getAll().subscribe(res => {
      this.totalItems = res.length;
      const result = res.slice(0, PAGINATION_PAGE_SIZE);
      this._pageItems.next(result);
    });
  }

  changePageHandler(page: number) {
    this.getListPostsPaging(page).subscribe(result => {
      this._pageItems.next(result);
      this.selection.clear();
    });
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

}
