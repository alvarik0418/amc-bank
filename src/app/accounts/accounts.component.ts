import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UserService } from '../sign-up/user.service';

@Component({
  selector: 'app-accounts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accounts.component.html',
  styleUrl: './accounts.component.css'
})
export class AccountsComponent {
    accounts:string[] = [];

    constructor(private userService:UserService){}

    ngOnInit(){
      this.getAccountsUser();
    }

    getAccountsUser(): void {
      this.userService.getProfile().subscribe(user => this.accounts = user.accounts);
    }
}
