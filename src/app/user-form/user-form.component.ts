import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../sign-up/user.service';
import { Router } from '@angular/router';
import { AccessToken } from '../authentication/access-token';
import { Users } from '../users';
import { Location, NgIf } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
    @Input() componentNameOrigin?: string;
    userForm!: FormGroup
    disabled:boolean = true;
    
    constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private router:Router,
      private location: Location
    ){}

    ngOnInit(){
      this.userForm = this.formBuilder.group(
        {
          firstName: ['',[Validators.required, Validators.maxLength(50)]],
          lastName: ['',[Validators.required, Validators.maxLength(50)]],
          email: ['',[Validators.required, Validators.email]],
          password: ['', Validators.required]
        }
      )

      if(this.componentNameOrigin === "profile"){
        this.userService.getProfile().subscribe(
          (user: Users) => {
            this.userForm.patchValue(user);
            this.userForm.get('firstName')?.disable();
            this.userForm.get('lastName')?.disable();
            this.userForm.get('email')?.disable();
            this.userForm.get('password')?.disable();
          }
        );

        console.log("Profile");
      }
    }

    onSubmit(){
      if (this.userForm.valid && !this.userForm.pristine){
        
      if (this.componentNameOrigin === "signUp"){
          const signUp = this.userForm.getRawValue() as Users

          this.userService.signUp(signUp).subscribe(
            (accessToken: AccessToken) => {
              localStorage.setItem('accessToken', accessToken.accessToken);
              console.log(signUp);
            this.router.navigate(['/']);
            });
        }
      }
      else {
        console.log("Form is invalid");
      }
    }

    gotoBack(): void {
      this.location.back();
    }
}
