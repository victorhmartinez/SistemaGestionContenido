import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupContact } from '../models/groupContact';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupContactService {
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

  public createGroupContact(groupContact: GroupContact) {
    return this.httpClient.post(this.apiUrl+'group_contact/', groupContact, this.httpOptions);
  }

  public updateGroupContact(groupContact: GroupContact) {
    return this.httpClient.put(this.apiUrl+'group_contact/'+groupContact.group_contact_id+'/', groupContact,this.httpOptions);
  }

  public deleteGroupContact(id: number) { 
    return this.httpClient.delete(this.apiUrl+'group_contact/'+id+'/', this.httpOptions);
  }

  public getGroupContact() { 
    return this.httpClient.get<GroupContact[]>(this.apiUrl+'group_contact/', this.httpOptions);
  }
}
