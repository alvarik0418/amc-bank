import { Component } from '@angular/core';
import { Transaction } from '../transactions/transaction';
import { TransactionService } from '../transactions/transaction.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  transactions: Transaction[] = [];
  totalWithdrawal: number = 0;
  totalDeposits: number = 0;
  totalBalance: number = 0;

  constructor(private transactionService: TransactionService){}

  ngOnInit(){
    this.getTransactions();    
  }

  getTransactions(): void {
    this.transactionService.getAll().subscribe(
      transactions => {
        transactions.forEach(element => {
          switch(element.type) { 
            case "Withdrawal":
              this.totalWithdrawal += element.amount
              break;
            case "Deposit":
              this.totalDeposits += element.amount
              break;
            default: { 
              break;              
            } 
          }
          this.totalBalance = element.balance          
        })
        this.totalBalance = parseFloat(this.totalBalance.toFixed(2));
        this.totalWithdrawal = parseFloat(this.totalWithdrawal.toFixed(2));;
        this.totalDeposits = parseFloat(this.totalDeposits.toFixed(2));;
      }
    );
  }
}
