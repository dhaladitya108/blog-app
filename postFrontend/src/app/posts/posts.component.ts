import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts: Post[];
  post: Post;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this._postService
      .getPosts()
      .pipe(
        map((responseData) => {
          return responseData.posts.map((post) => {
            return {
              id: post._id,
              title: post.title,
              description: post.description,
            };
          });
        })
      )
      .subscribe((changedData) => {
        //console.log
        this.posts = changedData;
      });
  }
}
