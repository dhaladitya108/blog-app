import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private _baseUrl = 'http://localhost:8080/api/';
  constructor(private _http: HttpClient) {}

  getPosts() {
    return this._http.get<{ message: string; posts: any }>(
      this._baseUrl + 'posts'
    );
  }

  savePost(post: Post) {
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    });

    const httpOptions = {
      headers: httpHeaders,
    };
    console.log(post);
    return this._http.post<{ message: string; posts: any }>(
      this._baseUrl + '/save',
      post,
      httpOptions
    );
  }
  getPostbyId() {}

  updatePost() {}

  deletePost() {}
}
