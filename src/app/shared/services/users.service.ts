import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services';

@Injectable()
export class UsersService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll() {
    return this.apiService.get('/users');
  }
}
