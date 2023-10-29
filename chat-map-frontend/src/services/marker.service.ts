import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export interface Post {
  title:string;
  content:string;
  latitude:number;
  longitude:number;
  userId:number;
}
@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  protected userId: any;

  constructor(public httpClient: HttpClient) { }

  public getUserId(): any {
    return this.userId;
  }

  public setUserId(userId: any): void {
    this.userId = userId;
  }

  createPost(post: Post) {
    post.userId = this.getUserId();
    return this.httpClient.post<any>("http://localhost:3000/report/", post).pipe(
      tap(post => console.log(post)),
      map(post => post)
    )
  }

  getAllPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>("http://localhost:3000/report/").pipe(
      tap(data => console.log('All: ' + JSON.stringify(data)))
    );
  }
}
