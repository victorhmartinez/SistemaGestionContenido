import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { PersonContact } from '../models/personcontact';

@Injectable({
  providedIn: 'root'
})
export class PersonContactService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) {
    this.apiUrl = environment.apiUrl;
   }
   public createPersonContact(personContact: PersonContact) {
    return this.httpClient.post(this.apiUrl+'person_contact/', personContact, this.httpOptions);
  }
    
  public updatePersonContact(personContact: PersonContact) {
    return this.httpClient.put(this.apiUrl+'person_contact/'+personContact.person_contact_id+'/', personContact,this.httpOptions);
  }

  public deletePersonContact(id: number) { 
    return this.httpClient.delete(this.apiUrl+'person_contact/'+id+'/', this.httpOptions);
  }

  public getPersonContact() { 
    return this.httpClient.get<PersonContact[]>(this.apiUrl+'person_contact/', this.httpOptions);
  }
}
