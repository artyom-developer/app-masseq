import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import {  Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
 

  private apiURL = "https://accounts.spotify.com/api/token"; 

  httpOptions = {
     headers: new HttpHeaders({ 
       'Content-Type': "application/x-www-form-urlencoded",
       'Authorization':'Basic NGJmNDFkZjU3NzI2NGNhMDljMmNhNjMwOTg2MmI1NDQ6OWQ1MTQ0YjliZTk3NGY3ODg5MjQwMWU3NmJlNzM1MGI=' 
     }) 
  }

  constructor(private httpClient: HttpClient) { }

  authToekn() {
    const body = new HttpParams()
    .set('grant_type', 'client_credentials') ;

    return this.httpClient.post(this.apiURL, body.toString(), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
}