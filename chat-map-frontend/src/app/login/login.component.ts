import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';



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


    public authUsername: any;
    public authPassword: any;

    public authUsernameList:any[]=[];
    public authPasswordList:any[]=[];
    
    constructor(private loginService:LoginService, private cdr: ChangeDetectorRef){}

    ngOnInit() {
      this.users$ = this.loginService.getUsers();
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    authenticateUser(usr:any, pass:any):any {
      //this.authUsers.push(usr,pass);

      //console.log(this.authUsers);
      // this.authUsername=usr;
      // this.authPassword=pass;

      // if(usr && pass){
      //   this.authUsers.push(this.authUsername);
      //   this.authPasses.push(this.authPasses);
      //   for(let uname of this.authUsers){
      //     //console.log(uname);
      //     for(let upass of this.authPasses){
      //       if(this.username==uname && this.password==upass){
      //         this.isAuthenticated=true;
      //         console.log("Login successful.");
      //         return true;
      //       } else {
      //         this.isAuthenticated=false;
      //         console.log("Username or password is incorrect");
      //         return false;
      //       }
      //     }
      //   }
      // }
      this.addToUsernameList(usr);
      this.addToPasswordList(pass);
      




      if(this.username && this.password){
        for(let i=0;i<this.authUsernameList.length;i++) {
          for(let j=0;j<this.authPasswordList.length;j++) {
            if(this.username==this.authUsernameList[i] && this.password==this.authPasswordList[j]) {
              this.isAuthenticated=true;
              this.loginService.login(this.username,this.password);
              console.log("Login successful");
              
            } else {
              this.isAuthenticated=false;
              console.log("Login NOT successful");
              
            }
          }
        }
        if(this.username==usr && this.password==pass){
          this.isAuthenticated=true;
          console.log("Login successful.");
          return true;
        } else {
          this.isAuthenticated=false;
          console.log("Username or password is incorrect");
          return false;
        }

      }

    }

    public addToUsernameList(username:any): void {
      if(username) {
        username.toString();
        if(!this.authUsernameList.includes(username)) {
          this.authUsernameList.push(username);          
        }
      }
      username=null;
    }

    public addToPasswordList(password: any): void {
      if(password) {
        password.toString();
        if(!this.authPasswordList.includes(password)) {
          this.authPasswordList.push(password);
        }

      }
      password=null;
    }

    public submit() {
        console.log("username is " + this.username);
        // for(let user of this.users$) {
        //   console.log(user.username);
        //   console.log(user.password);
        // }
        this.clear();
        //this.isAuthenticated=true;
    }

    public clear() {
        this.username = "";
        this.password = "";
        this.show = true;
    }
    
}