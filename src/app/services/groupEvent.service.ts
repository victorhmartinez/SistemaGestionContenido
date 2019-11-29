import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GroupEvent } from '../models/groupEvent';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class GroupEventService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient,
    ) { 
    this.apiUrl = environment.apiUrl; 
  }
  
  public createGroupEvent(groupEvent: GroupEvent) {
    return this.httpClient.post(this.apiUrl+'/group_event/', groupEvent, this.httpOptions);
  }

  public updateGroupEvent(groupEvent: GroupEvent) {
    return this.httpClient.put(this.apiUrl+'/group_event/'+groupEvent.group_event_id+'/', groupEvent,this.httpOptions);
  }

  public deleteGroupEvent(id: number) { 
    return this.httpClient.delete(this.apiUrl+'/group_event/'+id+'/', this.httpOptions);
  }

  public getGroupEvent() { 
    return this.httpClient.get<GroupEvent[]>(this.apiUrl+'/group_event/', this.httpOptions);
  }
}
