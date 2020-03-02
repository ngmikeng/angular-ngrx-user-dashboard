import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';

@Injectable()
export class UsersService {
  private listUsersData$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private apiService: ApiService
  ) { }

  getAll() {
    return this.apiService.get('/users');
  }
}
