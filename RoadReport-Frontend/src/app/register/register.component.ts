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
  registerButtonDisabled: boolean = true;
  isAuthenticated: boolean = false;

  constructor(
    public loginService: LoginService,
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
      ]],
      passwordConfirm: [null, [Validators.required]],
      termsAndConditions: [false, Validators.requiredTrue]
    });
    
    this.registerForm.valueChanges.subscribe(() => {
      this.updateRegisterButtonState();
    });
 
  }

  updateRegisterButtonState() {
  this.registerButtonDisabled = this.registerForm.invalid || !this.registerForm.value.termsAndConditions;
  }
  isTermsAndConditionsInvalid() {
    const termsAndConditionsControl = this.registerForm.get('termsAndConditions');
    return termsAndConditionsControl?.invalid && termsAndConditionsControl?.touched;
  }
  
  submitUser() {
    if (this.registerForm.invalid || !this.registerForm.value.termsAndConditions) {
      return;
    }
    console.log(this.registerForm.value);
    this.loginService.register(this.registerForm.value).pipe(
      map(user => this.isAuthenticated = true)
    ).subscribe(() => {
      this.loginService.hideRegister();
    });
  }
  }