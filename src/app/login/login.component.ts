import { CommonModule, NgFor, NgIf, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Login } from './login';
import { AuthenticationService } from '../authentication/authentication.service';
import { AccessToken } from '../authentication/access-token';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterModule, FormsModule, NgIf, NgFor,UpperCasePipe, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  onSubmit(){
    if (this.loginForm.valid){
      const login = this.loginForm.getRawValue() as Login

      this.authService.singin(login).subscribe(
        (accessToken: AccessToken) => {
          localStorage.setItem('accessToken', accessToken.accessToken);
        });
      
      this.router.navigate(['/']);
    }
    else {
      console.log("Form is invalid");
    }
  }
}
