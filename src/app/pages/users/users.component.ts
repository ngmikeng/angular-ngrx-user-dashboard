import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';
import { SortEvent, ThSortableDirective } from '../../shared/directives/th-sortable.directive';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUsers$: Observable<IUser[]>;

  @ViewChildren(ThSortableDirective) headers: QueryList<ThSortableDirective>;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.listUsers$ = this.usersService.getAll();
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

}
