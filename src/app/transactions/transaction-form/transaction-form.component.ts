import { Location, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Transaction } from '../transaction';
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
      destination: new FormControl({value: '', disabled: true},),
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
    }, {updateOn: 'blur'})

    constructor(private transactionService: TransactionService,
                private userService:UserService,
                private location: Location
    ){}

    ngOnInit(): void{
      this.getAccounts();   
      this.selectedType = 'Deposit';
      this.transactionFormGroup.controls.type.setValue(this.selectedType);
      this.onSelected(this.selectedType);
    }

    getAccounts():void {
      this.userService.getProfile().subscribe(user => this.accounts = user.accounts);
    }

    onSubmit(): void {
      if (this.transactionFormGroup.valid && !this.transactionFormGroup.pristine){
        const transactionNew = this.transactionFormGroup.value as TransactionNew;
        this.transactionService.create(transactionNew).subscribe(() => this.gotoBack());
      }      
    }

    onSelected(value:string) {
      this.selectedType = value;

      this.transactionFormGroup.controls.source.reset();
      this.transactionFormGroup.controls.destination.reset();

      switch(value){
        case "Withdrawal":
          this.transactionFormGroup.controls.destination.disable();
          break;
        case "Deposit":
          this.transactionFormGroup.controls.destination.enable();
          break;
        default:
          break;
      }

      this.transactionFormGroup.controls.source.updateValueAndValidity();
    }

    onSelectedSource() {
      this.transactionFormGroup.updateValueAndValidity();    
    }

    focusOutFunction(){
      this.transactionFormGroup.updateValueAndValidity();
    }

    gotoBack(){
      this.location.back();
    }
}
