import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Item } from './interfaces';

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

  getCategoriesNames(){
    return this.http.get<Category>(`${this.apiUrl}/items/category`);
  }

}