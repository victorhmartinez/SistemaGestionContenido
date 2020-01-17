import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContentMedia } from '../models/content-media';

@Injectable({
  providedIn: 'root'
})
export class ContentMediaService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    }  )
  }
  constructor(private httpClient: HttpClient) { 
    this.apiUrl = environment.apiUrl;
  }
  public createContentMedia(contentMedia: ContentMedia) {
    return this.httpClient.post(this.apiUrl+'content_media/', contentMedia, this.httpOptions);
  }
    
  public updateContentMedia(contentMedia: ContentMedia) {
    return this.httpClient.put(this.apiUrl+'content_media/'+contentMedia.content_media_id+'/', contentMedia,this.httpOptions);
  }

  public deleteContentMedia(id: number) { 
    return this.httpClient.delete(this.apiUrl+'content_media/'+id+'/', this.httpOptions);
  }

  public getContentMedia() { 
    return this.httpClient.get<ContentMedia[]>(this.apiUrl+'content_media/', this.httpOptions);
  }
}
