import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AcademicPeriod } from '../models/academic-period';

@Injectable({
  providedIn: 'root'
})
export class AcademicPeriodService {
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
  public createAcademyPeriod(academicPeriod:AcademicPeriod) {
    return this.httpClient.post(this.apiUrl+'item_category/', academicPeriod, this.httpOptions);
  }
    
  public updateAcademyPeriod(academicPeriod: AcademicPeriod) {
    return this.httpClient.put(this.apiUrl+'item_category/'+academicPeriod.academicPeriod_id+'/', academicPeriod,this.httpOptions);
  }

  public deleteAcademyPeriod(id: number) { 
    return this.httpClient.delete(this.apiUrl+'item_category/'+id+'/', this.httpOptions);
  }

  public getAcademyPeriod() { 
    return this.httpClient.get<AcademicPeriod[]>(this.apiUrl+'item_category/', this.httpOptions);
  }


}
