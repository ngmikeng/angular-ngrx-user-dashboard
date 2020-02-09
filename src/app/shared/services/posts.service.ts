import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';

@Injectable()
export class PostsService {

  constructor(
    private apiService: ApiService
  ) { }

  getAll() {
    return this.apiService.get('/posts');
  }
}
