import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  public isAuthenticated: boolean = false;

  constructor(
    private loginService: LoginService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        name: [null, [Validators.required]],
        username: [null, [Validators.required]],
        email: [null, [
          Validators.required,
          Validators.email,
          Validators.minLength(6)
        ]],
        password: [null, [
          Validators.required,
          Validators.minLength(3)
          //CustomValidators.passwordContainsNumber
        ]],
        passwordConfirm: [null, [Validators.required]]
      }), {
        // Validators: CustomerValidators.passwordMatches
      }
  }

  submitUser() {
    console.log("hello");
    if(this.registerForm.invalid) {
      return;
    }
    console.log(this.registerForm.value);
    this.loginService.register(this.registerForm.value).pipe(
      map(user => this.isAuthenticated=true)
    ).subscribe(() => {
      this.loginService.hideRegister();
    })
  }

}
