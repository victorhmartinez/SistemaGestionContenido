import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonRole } from '../models/personRole';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonRoleService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  
  constructor(private httpClient: HttpClient,
    ) {
      this.apiUrl = environment.apiUrl;
  
    }

    public createPersonRole(personRole: PersonRole) {
      return this.httpClient.post(this.apiUrl+'person_role/', personRole, this.httpOptions);
    }

    public updatePersonRole(personRole: PersonRole) {
      return this.httpClient.put(this.apiUrl+'person_role/'+personRole.person_role_id+'/', personRole,this.httpOptions);
    }

    public deletePersonRole(id: number) { 
      return this.httpClient.delete(this.apiUrl+'person_role/'+id+'/', this.httpOptions);
    }

    public getPersonRole() { 
      return this.httpClient.get<PersonRole[]>(this.apiUrl+'person_role/', this.httpOptions);
    }
}
