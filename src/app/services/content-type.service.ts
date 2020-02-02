import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContentType } from '../models/content-type';
import { ItemCategory } from '../models/itemCategory';

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
  public createContentType(name:String) {
    return this.httpClient.post(this.apiUrl+'utils/type_content/', name, this.httpOptions);
  }
    
  public updateContentType(contentType: ContentType) {
    return this.httpClient.put(this.apiUrl+'utils/type_content/'+contentType.contentType_id+'/', contentType,this.httpOptions);
  }

  public deleteContentType(id: number) { 
    return this.httpClient.delete(this.apiUrl+'utils/type_content/'+id+'/', this.httpOptions);
  }

  public getContentType() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'utils/type_content/', this.httpOptions);
  }
}
