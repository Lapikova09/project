import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Item, BagItem } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = 'http://localhost:8000';
  activeItemId: number = 0 

  constructor(private http: HttpClient) {
    
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.apiUrl}/items/all`);
  }

  getItemById(id:number){
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/items/category`);
  }

  postItemIntoBag(itemId: number, userId: number): Observable<any> {
    const params = new HttpParams().set('user_id', userId.toString());
    return this.http.post(`${this.apiUrl}/basket/${itemId}`, {}, { params: params });
  }

  getBagItems(userId:number){
    const param = new HttpParams().set('user_id', userId.toString());
    return this.http.get<BagItem[]>(`${this.apiUrl}/basket`, { params: param });
  }
}