import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, map } from 'rxjs';
import { LoginService } from '../../services/login.service';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';



@Component({
    selector: 'log-in-page',
    templateUrl: './login.component.html',
    styleUrls: ['../login/login.component.css']
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
      console.log("test");
      if(this.loginForm.invalid) {
        return;
      }
      this.loginService.login(this.loginForm.value).pipe(
        map(token => (this.isAuthenticated=true))
      ).subscribe(() => {
        this.loginService.hideLogin();
      })
    }
    
}