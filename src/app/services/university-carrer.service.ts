import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UniversityCarrer } from '../models/universityCareer';
import { ItemCategory } from '../models/itemCategory';

@Injectable({
  providedIn: 'root'
})
export class UniversityCarrerService {
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

  public createUniversityCarrer(name:String) {
    return this.httpClient.post(this.apiUrl+'utils/university_career/', name, this.httpOptions);
  }
    
  public updateUniversityCarrer(universityCarrer: UniversityCarrer) {
    return this.httpClient.put(this.apiUrl+'utils/university_career/'+universityCarrer.university_career_id+'/', universityCarrer,this.httpOptions);
  }

  public deleteUniversityCarrer(id: number) { 
    return this.httpClient.delete(this.apiUrl+'utils/university_career/'+id+'/', this.httpOptions);
  }

  public getUniversityCarrer() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'utils/university_career/', this.httpOptions);
  }
}
