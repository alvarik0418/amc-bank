import { Component } from '@angular/core';
import { Transaction } from './transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from './transaction.service';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService){}

  ngOnInit(){
    this.getTransactions();
  }

  getTransactions(): void {
    this.transactionService.getAll().subscribe(transactions => this.transactions = transactions);
  }
}
