import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UniversityCarrer } from '../models/universityCareer';
import { ItemCategory } from '../models/itemCategory';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UniversityCarrerService {
  private apiUrl: string;
  baseURL = environment.apiUrl + 'utils/find_item_category/';
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
  public getUniversityCarrerID2(name:String) { 
    console.log('Sale',this.httpClient.get<ItemCategory[]>(this.apiUrl+'utils/find_item_category/?name='+name, this.httpOptions))
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'utils/find_item_category/?name='+name, this.httpOptions);
  }
  public getUniversityCarrerID(name: String) { 
    const url = `${this.baseURL}?name=${name}`;
    console.log(this.httpClient.get<ItemCategory[]>(url));
    return this.httpClient.get<ItemCategory[]>(url);
  }
}
