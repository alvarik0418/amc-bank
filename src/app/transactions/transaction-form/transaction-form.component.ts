import { Location, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../transaction';
import { ActivatedRoute } from '@angular/router';
import { TransactionNew, TransactionService } from '../transaction.service';
import { UserService } from '../../sign-up/user.service';

@Component({
  selector: 'app-transaction-form',
  standalone: true,
  imports: [FormsModule, NgIf, NgFor, ReactiveFormsModule],
  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.css'
})
export class TransactionFormComponent {
    transaction?:Transaction;
    accounts?: string[] = [];
    types: string [] = ["Deposit", "Withdrawal"];
    selectedType: string = '';
    selectedDestinaton: string = '';
    totalBalance?: number = 0;
    disabled?: boolean = true;

    public transactionFormGroup =new FormGroup({
      type: new FormControl('', Validators.required),
      source: new FormControl('', Validators.required),
      destination: new FormControl({value: '', disabled: true},[Validators.maxLength(10)]),
      category: new FormControl(
        '', 
        [Validators.required, 
         Validators.minLength(3), 
         Validators.maxLength(50),
        ]),
      amount: new FormControl(
        0, [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
       ]),
      description: new FormControl(
        '', [Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(50),
       ]),
    })

    constructor(private transactionService: TransactionService,
                private userService:UserService,
                private location: Location
    ){}

    ngOnInit(): void{
      this.getAccounts();
     // this.transactionFormGroup.reset();
    }

    getAccounts():void {
      this.userService.getProfile().subscribe(user => this.accounts = user.accounts);
    }

    onSubmit(): void {
      const transactionNew = this.transactionFormGroup.value as TransactionNew;
      this.transactionService.create(transactionNew).subscribe(() => this.gotoBack());
    }

    onSelected(value:string) {
      this.selectedType = value;
      /*this.transactionFormGroup.get('source')?.reset();
      this.transactionFormGroup.get('destination')?.reset();     
      */
      switch(value){
        case "Withdrawal":
          //this.disabled = true;
          this.transactionFormGroup.get('destination')?.disable;
          break;
        case "Deposit":
          //this.disabled = false;
          this.transactionFormGroup.get('destination')?.enable;
          break;
        default:
          //this.disabled = true;
          this.transactionFormGroup.get('destination')?.disable;
          break;
      }
      this.transactionFormGroup.get('destination')?.updateOn;
      
    }

    gotoBack(){
      this.location.back();
    }
}
