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
    
    constructor(public loginService:LoginService, private cdr: ChangeDetectorRef){}

    ngOnInit() {
      // this.users$ = this.loginService.getUsers();
      //this.login();
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    login(username: string, password: string) {
      this.loginService.login(username, password).subscribe(data=>console.log("success"));
    }

    public submit() {
        console.log("username is " + this.username);
        // for(let user of this.users$) {
        //   console.log(user.username);
        //   console.log(user.password);
        // }
        this.login(this.username, this.password);
        this.clear();
        //this.isAuthenticated=true;
    }

    public clear() {
        this.username = "";
        this.password = "";
        this.show = true;
    }
    
}