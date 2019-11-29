import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PreRequirements } from '../models/pre-requirements';

@Injectable({
  providedIn: 'root'
})
export class PreRequirementsService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  public createpreRequirements(preRequirements: PreRequirements) {
    return this.httpClient.post(this.apiUrl+'requirement/', preRequirements, this.httpOptions);
  }
    
  public updatepreRequirements(preRequirements: PreRequirements) {
    return this.httpClient.put(this.apiUrl+'requirement/'+preRequirements.requirement_id+'/', preRequirements,this.httpOptions);
  }

  public deletepreRequirements(id: number) { 
    return this.httpClient.delete(this.apiUrl+'requirement/'+id+'/', this.httpOptions);
  }

  public getpreRequirements() { 
    return this.httpClient.get<PreRequirements[]>(this.apiUrl+'requirement/', this.httpOptions);
  }
}
