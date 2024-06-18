import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Transaction } from './transaction';


export type TransactionNew = Omit<Transaction, 'status'|'balance'|'date'>;

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private endpoint = "http://localhost:3000/transactions";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {      
      console.error(error);
      //this.log(`${operation} failed: ${error.message}`);
      return of(result as T)	
    };
  }

  getAll():Observable<Transaction[]>{
      return this.http.get<Transaction[]>(this.endpoint).
      pipe(
        catchError(this.handleError<Transaction[]>('Get Transactions',[]))
      );
  }

  create(transaction: TransactionNew): Observable<any>{
    return this.http.post<any>(this.endpoint, transaction, this.httpOptions).pipe(
      catchError(this.handleError<any>('Create transaction'))
    );
  }
}
