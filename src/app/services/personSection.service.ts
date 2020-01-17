import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonSection } from '../models/personSection';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonSectionService {
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

    public createPersonSection(personSection: PersonSection) {
      return this.httpClient.post(this.apiUrl+'person_section/', personSection, this.httpOptions);
    }

    public updatePersonSection(personSection: PersonSection) {
      return this.httpClient.put(this.apiUrl+'person_section/'+personSection.person_section_id+'/', personSection,this.httpOptions);
    }

    public deletePersonSection(id: number) { 
      return this.httpClient.delete(this.apiUrl+'person_section/'+id+'/', this.httpOptions);
    }

    public getPersonSection() { 
      return this.httpClient.get<PersonSection[]>(this.apiUrl+'person_section/', this.httpOptions);
    }
}
