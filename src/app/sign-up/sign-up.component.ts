import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { SignUpService } from './sign-up.service';
import { AccessToken } from '../authentication/access-token';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  title: string = "Sign Up";

  signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signUpService: SignUpService,
    private router:Router
  ){}

  ngOnInit(){
    this.signUpForm = this.formBuilder.group(
      {
        firstName: ['',[Validators.required, Validators.maxLength(50)]],
        lastName: ['',[Validators.required, Validators.maxLength(50)]],
        email: ['',[Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
    )
  }

  onSubmit(){
    if (this.signUpForm.valid){
      const signUp = this.signUpForm.getRawValue() as Users

      this.signUpService.signUp(signUp).subscribe(
        (accessToken: AccessToken) => {
          localStorage.setItem('accessToken', accessToken.accessToken);
        });
      
      console.log(signUp);
      this.router.navigate(['/']);
    }
    else {
      console.log("Form is invalid");
    }
  }
}
