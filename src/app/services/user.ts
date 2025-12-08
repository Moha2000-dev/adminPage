import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class User {
  private base = "https://fakestoreapi.com/users";
  constructor(private http : HttpClient ) { }

  getUsers() {
    return this.http.get(this.base).pipe(
      map((data) => data),
      catchError((error) => {
        throw 'Error in source. Details: ' + error;
      })
    );
  }
  
}
