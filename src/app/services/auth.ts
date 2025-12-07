import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
   private base = "https://fakestoreapi.com/auth/login";
  constructor( private http: HttpClient) { }
  login(data: {username:string,password:string}){
    return this.http.post(this.base,data).pipe(
      map((data) =>data),catchError((error) => {
        throw error;
      })
    );
  }
  
}
