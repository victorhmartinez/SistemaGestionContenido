import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Requirement } from '../models/requirement';

@Injectable({
  providedIn: 'root'
})
export class RequirementService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  public createRequirement(Requirement: Requirement) {
    return this.httpClient.post(this.apiUrl+'requirement/', Requirement, this.httpOptions);
  }
    
  public updateRequirement(Requirement: Requirement) {
    return this.httpClient.put(this.apiUrl+'requirement/'+Requirement.requirement_id+'/', Requirement,this.httpOptions);
  }

  public deleteRequirement(id: number) { 
    return this.httpClient.delete(this.apiUrl+'requirement/'+id+'/', this.httpOptions);
  }

  public getRequirement() { 
    return this.httpClient.get<Requirement[]>(this.apiUrl+'requirement/', this.httpOptions);
  }
}
