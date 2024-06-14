import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../users';
import { UserService } from './user.service';
import { AccessToken } from '../authentication/access-token';
import { UserFormComponent } from '../user-form/user-form.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, UserFormComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  title: string = "Sign Up";
  componentNameOrigin: string = "signUp"; 
}
