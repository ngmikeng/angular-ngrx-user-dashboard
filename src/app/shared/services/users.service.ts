import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../models/user.model';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class UsersService {
  private listUsersData$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private apiService: ApiService
  ) { }

  getAll(page?, limit?) {
    let params = new HttpParams();
    if (page) {
      params = params.set('_page', page);
    }
    if (limit) {
      params = params.set('_limit', limit);
    }
    return this.apiService.get('/users', params);
  }
}
