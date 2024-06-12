import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, lastValueFrom, of, tap } from 'rxjs';
import { Login } from '../login/login';
import { AccessToken } from './access-token';
import { IsLoggedIn } from './is-logged-in';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private endpoint = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  };

  constructor(private http: HttpClient) {}

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any): Observable<T> => {      
      console.error(error);
      return of(result as T)	
    };
  }

  async isLoggedIn(): Promise<boolean>{
    try {
      const response = await lastValueFrom(this.http.get<IsLoggedIn>(`${this.endpoint}/check-signin`));

      return response.loggedIn;
    } catch (error) {
      return false
    }
  }

  singin(payload: Login): Observable<AccessToken>{
    return this.http.post<AccessToken>(`${this.endpoint}/signin`, payload).
    pipe(
      catchError(this.handleError<AccessToken>('postLogin'))
    );
  }
}
