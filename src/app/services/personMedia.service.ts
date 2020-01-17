import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PersonMedia } from '../models/personMedia';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonMediaService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }

  constructor(private httpClient: HttpClient,
    ) { 
      this.apiUrl = environment.apiUrl;
    }
    public createPersonMedia(personMedia: PersonMedia) {
      return this.httpClient.post(this.apiUrl+'person_media/', personMedia, this.httpOptions);
    }

    public updatePersonMedia(personMedia: PersonMedia) {
      return this.httpClient.put(this.apiUrl+'person_media/'+personMedia.person_media_id+'/', personMedia,this.httpOptions);
    }

    public deletePersonMedia(id: number) { 
      return this.httpClient.delete(this.apiUrl+'person_media/'+id+'/', this.httpOptions);
    }

    public getPersonMedia() { 
      return this.httpClient.get<PersonMedia[]>(this.apiUrl+'person_media/', this.httpOptions);
    }
}