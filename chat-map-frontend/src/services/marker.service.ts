import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface Post {
  title:string;
  content:string;
  latitude:number;
  longitude:number;
  userEntityId:number;
}
@Injectable({
  providedIn: 'root'
})
export class MarkerService {

  constructor(public httpClient: HttpClient) { }

  createPost(post: Post) {
    console.log(post);
    return this.httpClient.post<any>("http://localhost:3000/post/", post).pipe(
      tap(post => console.log(post)),
      map(post => post)
    )
  }
}
