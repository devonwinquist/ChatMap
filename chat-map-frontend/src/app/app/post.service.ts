import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';


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



  createPost(title:string, message:string, lat:number, lng:number, userId:number){
    console.log(title,message,lat,lng,userId);
    const post: Post = {
      title: title,
      content: message,
      latitude: lat,
      longitude: lng,
      userId: 3
    };
    return this.httpClient.post<any>('http://localhost:3000/post',{post});
  }
}
