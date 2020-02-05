import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Section } from '../models/section';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl: string;
  baseURLPosts = environment.apiUrl + 'utils/university_career_sections/';
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
    /*public getSectionID(university_career_id: number):Observable<Section[]> { 
      http://3.134.77.123:8000/api/utils/find_item_category/?name=Sistemas
      const url =`${this.apiUrl}?university_career_id=${university_career_id}`;
      return this.httpClient.get<Section[]>(this.apiUrl+'utils/university_career_sections/'+university_career_id, this.httpOptions);
    }
    */


    public getSectionID(university_career_id: number):Observable<Section[]> { 
      const url = `${this.baseURLPosts}?university_career_id=${university_career_id}`;
      return this.httpClient.get<Section[]>(url);
    }
}
