import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected username: string;
  protected password: string;
  public isAuthenticated: boolean;

  constructor(private httpClient:HttpClient) {
    this.isAuthenticated = false;
  }

  login(email: string, password: string) {
    return this.httpClient.post<any>('http://localhost:3000/users/login', {email, password}).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('token', token.access_token);
        if(token) {
          this.isAuthenticated=true;
        }
        return token;
      })
    );
  }
}
