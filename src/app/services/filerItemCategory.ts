import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { ItemCategory } from '../models/itemCategory';

@Injectable({
  providedIn: 'root'
})
export class UnirversityCareerService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  constructor(private httpClient: HttpClient,) {
    this.apiUrl = environment.apiUrl;
   }
   public getTypeContact(){
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'itemcategoryTypeContact/', this.httpOptions);
   }
   public getDepartments(){
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'itemcategorySecciones/', this.httpOptions);
   }
   public getUniversityCareer() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'itemcategoryTitulacion/', this.httpOptions);
  }
  public getTypeEvent() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'itemcategoryTyeEvent/', this.httpOptions);
  }
  public getAcademicPeriod() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'itemcategoryAcademicPeriod/', this.httpOptions);
  }
}
