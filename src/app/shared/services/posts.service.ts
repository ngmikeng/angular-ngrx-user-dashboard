import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PostsService {

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
    return this.apiService.get('/posts', params);
  }
}
