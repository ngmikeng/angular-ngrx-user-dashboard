import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAGINATION_PAGE_SIZE } from '../../helpers/app.constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _collectionSize: number;
  _page: number = 1;

  constructor() { }

  @Input()
  set collectionSize(size: number) { // total number of items
    this._collectionSize = size;
  }
  @Input()
  set page(n: number) { // current page
    if (n) {
      this._page = n;
    }
  }
  @Input()
  pageSize: number = PAGINATION_PAGE_SIZE; // number of items per page

  @Output()
  onChangePage: EventEmitter<number> = new EventEmitter();

  ngOnInit() {
  }

  pageChange(page: number) {
    this.onChangePage.emit(page);
  }

}
