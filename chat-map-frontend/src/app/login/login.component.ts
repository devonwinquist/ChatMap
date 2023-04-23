import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { async } from '@angular/core/testing';


@Component({
    selector: 'log-in-page',
    templateUrl: './login.component.html',
    styleUrls: ['../app/app.component.css']
})

export class LoginComponent implements OnInit {
    public users$: Observable<any> | undefined;
    public username: string = "";
    public password: string = "";
    public show: boolean = false;
    public isAuthenticated = false;

    public authUsers:Observable<any>[];
    
    constructor(private loginService:LoginService){}

    ngOnInit() {
      this.users$ = this.loginService.getUsers();
      //this.authUsers = this.users$;
    }

    authenticateUser(usr:any, pass:any):boolean {
      if(this.username==usr && this.password==pass){
        return true;
        console.log("Login successful.");
      } else {
        return false;
        console.log("Username or password is incorrect");
      }
    }

    public submit() {
        console.log("username is " + this.username);
        // for(let user of this.users$) {
        //   console.log(user.username);
        //   console.log(user.password);
        // }
        this.clear();
        this.isAuthenticated=true;
    }

    public clear() {
        this.username = "";
        this.password = "";
        this.show = true;
    }
    
}