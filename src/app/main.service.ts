import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
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

  token:string =''

  getItems(): Observable<Item[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.get<Item[]>(`${this.apiUrl}/items/all`,  { headers });
  }

  getItemById(id:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    return this.http.get<Item>(`${this.apiUrl}/items/${id}`,  { headers });
  }

  getCategories(){
    return this.http.get<Category[]>(`${this.apiUrl}/category`);
  }

  postItemIntoBag(itemId: number, count: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    const params = new HttpParams().set('count', count.toString());
    console.log(count + "sssss")
    
    const options = {
      headers: headers,
      params: params
    };

    return this.http.post(`${this.apiUrl}/basket/${itemId}`, {}, options);
  }

  getBagItems(userId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    const param = new HttpParams().set('user_id', userId.toString());
    
    const options = {
      headers: headers,
      params: param
    };

    return this.http.get<BagItem[]>(`${this.apiUrl}/basket`, options);
  }

  deleteItemFromBag(itemId:number, userId:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    const param = new HttpParams().set('user_id', userId.toString());
    
    const options = {
      headers: headers,
      params: param
    };

    return this.http.delete<BagItem>(`${this.apiUrl}/basket/${itemId}`, options);
  }

  login(data:any): Observable<any>{
    return this.http.post(`${this.apiUrl}/login`, data);
  }
}