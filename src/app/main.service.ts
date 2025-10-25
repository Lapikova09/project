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

  constructor(private http: HttpClient) {}

  token:string =''

  //Выход за предел страниц, фильтрация по категориям и ее приколы

  getItems(min_price:number|null, max_price:number|null, sort_type:string, page:number): Observable<Item[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    let params = new HttpParams();
      
    if (min_price !== null) {
      params = params.set('min_price', min_price.toString());
    }
    if (max_price !== null) {
      params = params.set('max_price', max_price.toString());
    }
    if(sort_type) params=params.set('sort_type', sort_type)
    params=params.set('page', page)

    const options = {
      headers: headers,
      params: params
    };

    return this.http.get<Item[]>(`${this.apiUrl}/items/all`, options);
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