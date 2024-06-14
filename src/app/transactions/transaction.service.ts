import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Transaction } from './transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private endpoint = "http://localhost:3000/transactions";

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
}
