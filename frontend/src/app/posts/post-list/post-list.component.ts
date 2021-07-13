import { HttpClient } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
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
  totalPost = 0;
  postPerPage = 2;
  currentPage = 1;
  pageSizeOption = [1, 2, 5, 10];
  private postSub!: Subscription;
  userIsAuthenticated = false;
  private authListenerSub: Subscription;
  constructor(
    public PostService: PostsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.PostService.getPosts(this.postPerPage, this.currentPage);
    this.postSub = this.PostService.getPostUpdateListener().subscribe(
      (postData: { posts: Post[]; postCount: number }) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPost = postData.postCount;
      }
    );
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSub = this.authService
      .getAuthStatusListener()
      .subscribe((isAuthenticated) => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }
  onDelete(postId: string) {
    this.isLoading = true;
    this.PostService.deletePost(postId).subscribe(() => {
      this.PostService.getPosts(this.postPerPage, this.currentPage);
    });
  }

  onChangPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postPerPage = pageData.pageSize;
    this.PostService.getPosts(this.postPerPage, this.currentPage);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authListenerSub.unsubscribe();
  }
}
