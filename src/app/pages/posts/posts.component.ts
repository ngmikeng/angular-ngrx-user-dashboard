import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';
import { flatMap } from 'rxjs/operators';
import { PAGINATION_PAGE_SIZE } from '../../shared/helpers/app.constants';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  listPosts$: Observable<any[]>;
  totalItems: number;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.listPosts$ = this.postsService.getAll().pipe(flatMap(res => {
      this.totalItems = res.length;
      const result = res.slice(0, PAGINATION_PAGE_SIZE);
      return of(result);
    }));
  }

  changePageHandler(page: number) {
    this.listPosts$ = this.getListPostsPaging(page);
  }

  getListPostsPaging(curPage: number = 1) {
    const limit = PAGINATION_PAGE_SIZE;
    return this.postsService.getAll(curPage, limit).pipe(flatMap(res => {
      return of(res);
    }));
  }

}
