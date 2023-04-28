import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected username: string;
  protected password: string;

  constructor(private httpClient:HttpClient) { }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/login');
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>('/login', {username, password});
  }

  // sendUsers(usr:string, pass: string) {
  //   return this.httpClient.post();
  // }

}
