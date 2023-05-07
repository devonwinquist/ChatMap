import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from './login.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



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

    loginForm: FormGroup;
    
    constructor(public loginService:LoginService, private cdr: ChangeDetectorRef,
      private formBuilder: FormBuilder){}

    

    ngOnInit(): void {
      this.loginForm = new FormGroup({
        email: new FormControl(null, [
          Validators.required,
          Validators.email,
          Validators.minLength(6)
        ]),
        password: new FormControl(null, [
          Validators.required,
          Validators.minLength(3)
        ])
      })
    }

    ngAfterContentChecked(): void {
        this.cdr.detectChanges();
    }

    onSubmit() {
      if(this.loginForm.invalid) {
        return;
      }
      this.loginService.login(this.loginForm.value).pipe(
        map(token => (this.isAuthenticated=true))
      ).subscribe(() => {
        this.loginService.hideLogin();
      })

      // if(this.loginService.isAuthenticated==true) {
      //   this.loginService.isShowingLogin = false;
      // }

      
      this.clear();
    }

    // login(username: string, password: string) {
    //   this.loginService.login(username, password).subscribe(data=>console.log("success"));
    // }

    public submit() {
        console.log("username is " + this.username);
        // for(let user of this.users$) {
        //   console.log(user.username);
        //   console.log(user.password);
        // }

        
        // this.login(this.username, this.password);
        if(this.loginService.isAuthenticated==true) {
          this.loginService.isShowingLogin = false;
        }
        this.clear();
        //this.isAuthenticated=true;
    }

    public clear() {
        this.username = "";
        this.password = "";
        this.show = true;
    }
    
}