import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


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
export class PostService {

  constructor(public httpClient: HttpClient) { }

  private postUrl = 'http://localhost:3000/post';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  createPost(ptitle:string, pmessage:string, plat:number, plng:number, puserId:number){
    return this.httpClient.post<Post>('http://localhost:3000/post',{ptitle, pmessage, plat, plng, puserId},this.httpOptions).pipe(
      tap((newPost:Post) => console.log('Added post w/ id=${newPost.title}')),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  getPosts(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.postUrl).pipe(
      tap(_ => console.log('Fetched Posts')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error:any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
