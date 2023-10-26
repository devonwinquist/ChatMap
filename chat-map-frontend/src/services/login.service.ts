import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { MarkerService } from './marker.service';

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
  protected email: string;
  public userId: any;
  public isAuthenticated: boolean;

  public isShowingLogin: boolean;
  public isShowingLogout: boolean;
  public isShowingRegister: boolean;

  constructor(private httpClient:HttpClient, private markerService : MarkerService) {
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

  public setUsername(username: string): void {
    this.username = username;
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
  }

  public getUserId(): any {
    return this.userId;
  }

  public setUserId(userId: any): void {
    this.userId = userId;
  }

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


  register(user: User) {
    return this.httpClient.post<any>('http://localhost:3000/users/', user).pipe(
      tap(user => console.log(user)),
      map(user => user)
    )
  }

  getCurrentUser(email: string) {
    return this.httpClient.post<any>('http://localhost:3000/users/getUserByEmail', {email: email}).subscribe(data => {
      this.setUserId(data[0].id);
      this.markerService.setUserId(this.getUserId());
      return data;
    })
  }
}
