import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PAGINATION_PAGE_SIZE } from '../../helpers/app.constants';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  _collectionSize: number;

  constructor() { }

  @Input()
  set collectionSize(size: number) { // total number of items
    console.log(size);
    this._collectionSize = size;
  }
  @Input()
  page: number = 1; // current page
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
