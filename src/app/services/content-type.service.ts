import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContentType } from '../models/content-type';

@Injectable({
  providedIn: 'root'
})
export class ContentTypeService {

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
  public createContentType(contentType:ContentType) {
    return this.httpClient.post(this.apiUrl+'item_category/', contentType, this.httpOptions);
  }
    
  public updateContentType(contentType: ContentType) {
    return this.httpClient.put(this.apiUrl+'item_category/'+contentType.contentType_id+'/', contentType,this.httpOptions);
  }

  public deleteContentType(id: number) { 
    return this.httpClient.delete(this.apiUrl+'item_category/'+id+'/', this.httpOptions);
  }

  public getContentType() { 
    return this.httpClient.get<ContentType[]>(this.apiUrl+'item_category/', this.httpOptions);
  }
}
