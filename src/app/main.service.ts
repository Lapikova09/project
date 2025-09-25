import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = '';
  activeItemId: number = 0 

  constructor(private http: HttpClient) {
    
  }

  getItems(): Observable<Item[]> {
    console.log("Gjkexbk")
    return this.http.get<Item[]>(`${this.apiUrl}/items`);
  }

  getItemById(id:number){
    console.log("Gjkexbk")
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`);
  }

}