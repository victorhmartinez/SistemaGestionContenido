import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Role } from '../models/role';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  constructor(private httpClient: HttpClient,
  ){
    this.apiUrl = environment.apiUrl;    
  }

  public createRole(role: Role) {
    return this.httpClient.post(this.apiUrl+'role/', role, this.httpOptions);
  }

  public updateRole(role: Role) {
    return this.httpClient.put(this.apiUrl+'role/'+role.role_id+'/', role,this.httpOptions);
  }

  public deleteRole(id: number) { 
    return this.httpClient.delete(this.apiUrl+'role/'+id+'/', this.httpOptions);
  }

  public getRole() { 
    return this.httpClient.get<Role[]>(this.apiUrl+'role/', this.httpOptions);
  }
}