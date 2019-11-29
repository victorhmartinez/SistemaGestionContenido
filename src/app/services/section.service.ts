import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from '../models/section';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
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
     public createSection(section: Section) {
      return this.httpClient.post(this.apiUrl+'section/', section, this.httpOptions);
    }

    public updateSection(section: Section) {
      return this.httpClient.put(this.apiUrl+'section/'+section.section_id+'/', section,this.httpOptions);
    }

    public deleteSection(id: number) { 
      return this.httpClient.delete(this.apiUrl+'section/'+id+'/', this.httpOptions);
    }

    public getSection() { 
      return this.httpClient.get<Section[]>(this.apiUrl+'section/', this.httpOptions);
    }
}
