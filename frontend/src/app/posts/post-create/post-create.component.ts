import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  enteredContent = '';
  enteredTitle = '';
  @Output() postCreated = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}
  onAddPost(postForm: NgForm) {
    if (postForm.invalid) {
      return;
    }
    const post = { title: postForm.value.title , content: postForm.value.content };
    this.postCreated.emit(post);
  }
}
