import { Component } from '@angular/core';
import { Transaction } from './transaction';
import { CommonModule } from '@angular/common';
import { TransactionService } from './transaction.service';
import { RouterLink, RouterModule } from '@angular/router';
import { MessageService } from '../messages/message.service';

export enum OrderDirection {
  DOWN,
  UP
};

type OrderColumn = | 'type' | 'source' |  'category' ;

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.css'
})
export class TransactionsComponent {
  transactions: Transaction[] = [];
  
  orderDirection: Record<OrderColumn, OrderDirection> = {
    'type': OrderDirection.UP,
    'source': OrderDirection.UP,
    'category': OrderDirection.UP,
  };

  constructor(
    private transactionService: TransactionService,
    private messageService: MessageService
  ){}

  ngOnInit(){
    this.getTransactions();  
    this.messageService.getMessages();  
  }

  onChangeOrder(column: OrderColumn) {
    if (this.orderDirection[column] === OrderDirection.DOWN) {
      this.orderDirection[column] = OrderDirection.UP;
      this.transactions.sort((a, b) => a[column].localeCompare(b[column]))
    } else {
      this.orderDirection[column] = OrderDirection.DOWN;
      this.transactions.sort((a, b) => b[column].localeCompare(a[column]))
    }
  }

  getTransactions(): void {
    this.transactionService.getAll().subscribe(
      transactions => this.transactions = transactions
    );
  } 
}
