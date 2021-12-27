import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from '../models/Comment';
import { Post } from '../models/Post';

@Injectable({
  providedIn: 'root'
})

export class CommentsService {
  servicesUrl = 'https://localhost:44327/';
  servicesCommentAPI = 'api/Comment/';

  constructor(private http: HttpClient) { }

  public getCommentByPost(idpost : number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.servicesUrl + this.servicesCommentAPI + idpost);
  }

  public addComent(comment: Comment){
    return this.http.post(this.servicesUrl + this.servicesCommentAPI, comment);
  }
}