import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  isLoading = false;
  totalPost = 10;
  postPerPage= 2;
  pageSizeOption = [1, 2, 5, 10]
  private postSub!: Subscription;
  constructor(public PostService: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.PostService.getPosts();
    this.postSub = this.PostService.getPostUpdateListener().subscribe(
      (posts: Post[]) => {
        this.isLoading= false;
        this.posts = posts;
      }
    );
  }
  onDelete(postId: string) {
    this.PostService.deletePost(postId);
  }

  onChangPage(pageData: PageEvent) {
    console.log(pageData);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
