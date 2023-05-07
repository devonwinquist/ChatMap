import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

export interface LoginForm {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected username: string;
  protected password: string;
  public isAuthenticated: boolean;

  public isShowingLogin: boolean;
  public isShowingLogout: boolean;

  constructor(private httpClient:HttpClient) {
    this.isAuthenticated = false;
    this.isShowingLogin = false;
    this.isShowingLogout = false;
  }

  public showLogin() {
    this.isShowingLogin = true;
  }

  public hideLogin() {
    this.isShowingLogin = false;
  }

  // login(email: string, password: string) {
  login(loginForm: LoginForm) {
    return this.httpClient.post<any>('http://localhost:3000/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
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
