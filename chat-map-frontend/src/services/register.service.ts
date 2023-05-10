import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


export interface Post {
  title:string;
  content:string;
  latitude:number;
  longitude:number;
  createdBy:string;
}

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(public httpClient: HttpClient) { }

  createPost(post: Post) {
    return this.httpClient.post<any>('http:localhost:3000/post', post).pipe(
      tap(post => console.log(post)),
      map(post => post)
    )
  }
}
