import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { TypeContact } from '../models/type-contact';

@Injectable({
  providedIn: 'root'
})
export class TypeContactService {

  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;
  }
  public createTypeContact(name:String) {
    return this.httpClient.post(this.apiUrl+'utils/contact_type/', name, this.httpOptions);
  }
    
  public updateTypeContact(typeContact: TypeContact) {
    return this.httpClient.put(this.apiUrl+'utils/contact_type/'+typeContact.typeContact_id+'/', typeContact,this.httpOptions);
  }

  public deleteTypeContact(id: number) { 
    return this.httpClient.delete(this.apiUrl+'utils/contact_type/'+id+'/', this.httpOptions);
  }

  public getTypeContact() { 
    return this.httpClient.get<TypeContact[]>(this.apiUrl+'utils/contact_type/', this.httpOptions);
  }
}
