import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ItemCategory } from '../models/itemCategory';
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
  public createAcademyPeriod(name:String) {
    return this.httpClient.post(this.apiUrl+'utils/academic_period/', name, this.httpOptions);
  }
    
  public updateAcademyPeriod(academicPeriod: AcademicPeriod) {
    return this.httpClient.put(this.apiUrl+'utils/academic_period/'+academicPeriod.academicPeriod_id+'/', academicPeriod,this.httpOptions);
  }

  public deleteAcademyPeriod(id: number) { 
    return this.httpClient.delete(this.apiUrl+'utils/academic_period/'+id+'/', this.httpOptions);
  }

  public getAcademyPeriod() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'utils/academic_period/', this.httpOptions);
  }


}
