import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient,) {
    this.apiUrl = environment.apiUrl;
  }
  public createEvent(event: Event) {
    return this.httpClient.post(this.apiUrl+'/event/', event, this.httpOptions);
  }

  public updateEvent(event: Event) {
    return this.httpClient.put(this.apiUrl+'/event/'+event.event_id+'/', event,this.httpOptions);
  }

  public deleteEvent(id: number) { 
    return this.httpClient.delete(this.apiUrl+'/event/'+id+'/', this.httpOptions);
  }

  public getEvent() { 
    return this.httpClient.get<Event[]>(this.apiUrl+'/event/', this.httpOptions);
  }
}
