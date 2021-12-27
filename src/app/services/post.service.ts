import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/Post';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  servicesUrl = 'https://localhost:44327/';
  servicesAPI = 'api/post/';
  servicesUserAPI = 'api/user/profileInfo/';

  constructor(private http: HttpClient) { }

  editPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.servicesUrl + this.servicesAPI, post)
  }

  public getPosts(userId?: string): Observable<Post[]>{
    if(userId == null)
      return this.http.get<Post[]>(this.servicesUrl + this.servicesAPI);
    else
      return this.http.get<Post[]>(this.servicesUrl + this.servicesAPI + userId);
  }

  public createPost(post: Post): Observable<Post>{
    return this.http.post<Post>(this.servicesUrl + this.servicesAPI, post);
  }
}