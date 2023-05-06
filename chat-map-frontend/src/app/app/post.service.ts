import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(public httpClient: HttpClient) { }

  createPost(title:string, message:string, lat:number, lng:number, userId:number){
    console.log(title,message,lat,lng,userId);
    return this.httpClient.post<any>('http://localhost:3000/post',{title,message,lat,lng,userId});
  }
}
