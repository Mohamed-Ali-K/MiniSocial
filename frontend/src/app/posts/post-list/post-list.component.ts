import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy{
  posts: Post[] = [];
  private postSub!: Subscription;
  constructor(public PostService: PostsService) {}

  ngOnInit(): void {
    this.posts = this.PostService.getPosts();
    this.postSub =this.PostService.getPostUpdateListener().subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }
  ngOnDestroy () {
    this.postSub.unsubscribe();
  }
}
