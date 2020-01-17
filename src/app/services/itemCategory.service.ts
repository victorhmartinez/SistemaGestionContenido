import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ItemCategory } from '../models/itemCategory';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ItemCategoryService {

  private apiUrl: string;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'   ,
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('ACCESS_TOKEN'))
    }
    )
  }

  constructor(
    private httpClient: HttpClient,
  ) {
    this.apiUrl = environment.apiUrl;

  }

  public createItemCategory(itemCategory: ItemCategory) {
    return this.httpClient.post(this.apiUrl+'item_category/', itemCategory, this.httpOptions);
  }
    
  public updateItemCategory(itemCategory: ItemCategory) {
    return this.httpClient.put(this.apiUrl+'item_category/'+itemCategory.item_category_id+'/', itemCategory,this.httpOptions);
  }

  public deleteItemCategory(id: number) { 
    return this.httpClient.delete(this.apiUrl+'item_category/'+id+'/', this.httpOptions);
  }

  public getItemCategories() { 
    return this.httpClient.get<ItemCategory[]>(this.apiUrl+'item_category/', this.httpOptions);
  }
}
