import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from '../users';
import { Observable, catchError, of } from 'rxjs';
import { AccessToken } from '../authentication/access-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private endPoint = "http://localhost:3000";

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };
  
  constructor(private http: HttpClient) { }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {      
      console.error(error);
      return of(result as T)	
    };
  }

  signUp(user: Users): Observable<AccessToken>{
    return this.http.post<AccessToken>(`${this.endPoint}/signup`,user, this.httpOptions).
    pipe(
      catchError(this.handleError<AccessToken>('post signUp'))
    )
  }

  getProfile(): Observable<Users>{
    return this.http.get<Users>(`${this.endPoint}/users/profile`).
           pipe(
            catchError(this.handleError<Users>('get profile'))
           )
  }
}
