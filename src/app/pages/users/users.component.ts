import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { Observable } from 'rxjs';
import { IUser } from '../../shared/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listUsers$: Observable<IUser[]>;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.listUsers$ = this.usersService.getAll();
  }

}
