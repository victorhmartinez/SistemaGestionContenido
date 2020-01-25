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
  public createTypeContact(typeContact:TypeContact) {
    return this.httpClient.post(this.apiUrl+'item_category/', typeContact, this.httpOptions);
  }
    
  public updateTypeContact(typeContact: TypeContact) {
    return this.httpClient.put(this.apiUrl+'item_category/'+typeContact.typeContact_id+'/', typeContact,this.httpOptions);
  }

  public deleteTypeContact(id: number) { 
    return this.httpClient.delete(this.apiUrl+'item_category/'+id+'/', this.httpOptions);
  }

  public getTypeContact() { 
    return this.httpClient.get<TypeContact[]>(this.apiUrl+'item_category/', this.httpOptions);
  }
}
