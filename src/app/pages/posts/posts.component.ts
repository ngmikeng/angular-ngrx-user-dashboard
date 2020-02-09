import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PostsService } from '../../shared/services/posts.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  listPosts$: Observable<any[]>;

  constructor(
    private postsService: PostsService
  ) { }

  ngOnInit() {
    this.listPosts$ = this.postsService.getAll();
  }

}
