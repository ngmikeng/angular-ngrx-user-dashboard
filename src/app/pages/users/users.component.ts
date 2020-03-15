import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';
import { SortEvent, ThSortableDirective } from '../../shared/directives/th-sortable.directive';
import { Store, select } from '@ngrx/store';
import { State, ISelectedAllState } from '../pages.state';
import * as usersAction from './users.actions';
import { selectUsersPageItems, selectUsersTotalItems, selectUsersSelectAllState, selectUsersSelectedItems, selectUsersCurrentPage } from './users.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUsers$: Observable<IUser[]> = this.store.pipe(select(selectUsersPageItems));
  totalItems$: Observable<number> = this.store.pipe(select(selectUsersTotalItems));
  selectedAllState$: Observable<ISelectedAllState> = this.store.pipe(select(selectUsersSelectAllState))
  selectedItems$: Observable<IUser[]> = this.store.pipe(select(selectUsersSelectedItems));
  currentPage$: Observable<number> = this.store.pipe(select(selectUsersCurrentPage));

  selectedItems: IUser[] = [];

  @ViewChildren(ThSortableDirective) headers: QueryList<ThSortableDirective>;

  constructor(
    private store: Store<State>,
    private router: Router,
  ) { }

  ngOnInit() {
    // get total items
    this.store.dispatch(usersAction.actionUsersGetTotalItems());
    this.selectedItems$.subscribe(items => {
      this.selectedItems = items;
    });
  }

  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
  }

  compare(v1, v2) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  sortHandler(items: IUser[], column: string, direction: string): IUser[] {
    if (direction === '') {
      return items;
    } else {
      return [...items].sort((a, b) => {
        const res = this.compare(a[column], b[column]);
        return direction === 'asc' ? res : -res;
      });
    }
  }

  changePageHandler(page: number) {
    if (page) {
      this.router.navigate(['pages/users'], {
        queryParams: {
          page: page
        }
      });
    }
  }

  toggleSelectAllItem() {
    this.store.dispatch(usersAction.actionUsersToggleSelectAll({}));
  }

  toggleSelectItem(item: IUser) {
    this.store.dispatch(usersAction.actionUsersToggleSelectItem({ item }));
  }

  isSelectedItem(user: IUser) {
    return !!this.selectedItems.find(item => item.id === user.id);
  }

}
