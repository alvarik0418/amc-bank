import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Transaction } from './transaction';
import { MessageService } from '../messages/message.service';


export type TransactionNew = Omit<Transaction, 'status'|'balance'|'date'>;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private endpoint = "http://localhost:3000/transactions";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: String){
      this.messageService.add(`TransactionService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {      
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T)	
    };
  }

  getAll():Observable<Transaction[]>{
      return this.http.get<Transaction[]>(this.endpoint).
      pipe(
        //tap(_ => this.log(``, false)),
        catchError(this.handleError<Transaction[]>('Get Transactions',[]))
      );
  }

  create(transaction: TransactionNew): Observable<any>{
    return this.http.post<any>(this.endpoint, transaction, this.httpOptions).pipe(
      tap(_ => this.log(`Created Transaction`)),
      catchError(this.handleError<any>('Create transaction'))
    );
  }
}
