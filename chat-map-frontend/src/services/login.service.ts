import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs';

export interface LoginForm {
  email: string;
  password: string;
}

export interface User {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  protected username: string;
  protected password: string;
  protected authToken: any;
  public isAuthenticated: boolean;

  public isShowingLogin: boolean;
  public isShowingLogout: boolean;
  public isShowingRegister: boolean;

  constructor(private httpClient:HttpClient) {
    this.isAuthenticated = false;
    this.isShowingLogin = false;
    this.isShowingLogout = false;
    this.isShowingRegister = false;
  }

  public showRegister(): void {
    this.isShowingRegister = true;
  }
  
  public hideRegister(): void {
    this.isShowingRegister = false;
  }

  public showLogin(): void {
    this.isShowingLogin = true;
  }

  public hideLogin(): void {
    this.isShowingLogin = false;
  }

  public getUsername(): string {
    return this.username;
  }

  // login(email: string, password: string) {
  login(loginForm: LoginForm) {
    return this.httpClient.post<any>('http://localhost:3000/users/login', {email: loginForm.email, password: loginForm.password}).pipe(
      map((token) => {
        console.log(token);
        localStorage.setItem('token', token.access_token);
        if(token) {
          this.authToken = token;
          this.isAuthenticated=true;
        }
        return token;
      })
    );
  }

  logout(){
    if(this.authToken){
      localStorage.removeItem(this.authToken);
      this.isAuthenticated = false;
    }
  }

  register(user: User) {
    return this.httpClient.post<any>('http://localhost:3000/users/', user).pipe(
      tap(user => console.log(user)),
      map(user => user)
    )

  }

}
