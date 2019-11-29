import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserC } from '../models/UserC';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UserCService {

  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient,
    ) { 
      this.apiUrl = environment.apiUrl; 
    }
    public createUserC(user: UserC) {
     return this.httpClient.post(this.apiUrl+'/user/', user, this.httpOptions);
   }

   public updateUserC(user: UserC) {
     return this.httpClient.put(this.apiUrl+'/user/'+user.userC_id+'/', user,this.httpOptions);
   }

   public deleteUserC(id: number) { 
     return this.httpClient.delete(this.apiUrl+'/user/'+id+'/', this.httpOptions);
   }

   public getUserC() { 
     return this.httpClient.get<UserC[]>(this.apiUrl+'/user/', this.httpOptions);
   }
}
