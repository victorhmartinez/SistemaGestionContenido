import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Group } from '../models/group';


@Injectable({
  providedIn: 'root'
})
export class GroupService {
  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    })
  }
  constructor(private httpClient: HttpClient,) { 
    this.apiUrl = environment.apiUrl;
  }
  public createGroup(group: Group) {
    return this.httpClient.post(this.apiUrl+'group/', group, this.httpOptions);
  }

  public updateGroup(group: Group) {
    return this.httpClient.put(this.apiUrl+'group/'+group.group_id+'/', group,this.httpOptions);
  }

  public deleteGroup(id: number) { 
    return this.httpClient.delete(this.apiUrl+'group/'+id+'/', this.httpOptions);
  }

  public getGroup() { 
    return this.httpClient.get<Group[]>(this.apiUrl+'group/', this.httpOptions);
  }
}
