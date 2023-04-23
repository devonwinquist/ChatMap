import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'log-in-page',
    templateUrl: './login.component.html',
    styleUrls: ['../app/app.component.css']
})

export class LoginComponent implements OnInit {
    public username: string = "";
    public password: string = "";
    public show: boolean = false;
    public isAuthenticated = false;
    
    ngOnInit() {

    }

    public submit() {
        console.log("username is " + this.username);
        this.clear();
        this.isAuthenticated=true;
    }

    public clear() {
        this.username = "";
        this.password = "";
        this.show = true;
    }
    
}