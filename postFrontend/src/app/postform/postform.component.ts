import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-postform',
  templateUrl: './postform.component.html',
  styleUrls: ['./postform.component.css'],
})
export class PostformComponent implements OnInit {
  postDescription: string;
  postTitle: string;
  post: Post;
  postSaved: boolean = false;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {}

  onCreatePost() {
    this.post = {
      id: null,
      title: this.postTitle,
      description: this.postDescription,
    };
    this._postService.savePost(this.post).subscribe((responseData) => {
      if (responseData.posts.ops[0]._id) {
        this.postSaved = true;
      }
    });
  }
}
