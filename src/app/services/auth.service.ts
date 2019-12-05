 
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserI } from '../models/user';
import { JwtResponseI } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { isNullOrUndefined } from 'util';



@Injectable({
  providedIn: 'root'
})


export class AuthService {
  AUTH_SERVER: string = 'http://3.134.77.123:8000/';
  authSubject = new BehaviorSubject(false);
  private access: string;

  constructor(private httpClient: HttpClient ) { 
  }

  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  //Token
  login(user: UserI): Observable<JwtResponseI> {
    return this.httpClient.post<JwtResponseI>("http://3.134.77.123:8000/api/login/token/",
      user).pipe(tap(
        (res: JwtResponseI) => {
          if (res) {
            // guardar token
            this.saveToken(JSON.stringify(res["access"]));
            this.setUser(user);
          }
        })
      );
  }

  private saveToken(access: string): void {
    localStorage.setItem("ACCESS_TOKEN", access);
    this.access = access;
  }

  setUser(user: UserI): void {
    let user_string = JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }

  //Guards
  getCurrentUser(): UserI {
    let user_string = localStorage.getItem("currentUser");
    if (!isNullOrUndefined(user_string)) {
      let user: UserI = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
  }

  //Logout
  logout():void{
    this.access='';
    localStorage.removeItem('ACCESS_TOKEN"');
    localStorage.removeItem('currentUser"');
  }
  }

