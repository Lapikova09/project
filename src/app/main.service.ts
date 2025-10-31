import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Item, BagItem, Catalog, Bag, User, ItemComment } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = 'http://localhost:8000';
  activeItemId: number = 0 

  constructor(private http: HttpClient) {}

  token:string = ''

  // фотки и слайдеры
  //регистрация и верификация

  // Комментарии(изначально видно не все), а также их добавление, звездочки(нет)
  // Страницы для админа


  //Получение данных пользователя, страница с его данными и логаут
  

  getItems(min_price:number|null, max_price:number|null, sort_type:string, page:number, categoryID:number|null): Observable<Catalog> {
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

    if (categoryID !== null) {
      params = params.set('category', categoryID.toString());
    }

    const options = {
      headers: headers,
      params: params
    };

    return this.http.get<Catalog>(`${this.apiUrl}/items/all`, options);
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

    return this.http.get<Bag>(`${this.apiUrl}/basket`, options);
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

  login(password:string, username:string): Observable<any>{

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('password', password)
      .set('username', username);

    return this.http.post(`${this.apiUrl}/login`, body.toString(), { headers });
  }

  logout(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.post(`${this.apiUrl}/logout`, {}, { headers });
  }

  getUser(){
     const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.get<User>(`${this.apiUrl}/users/me`, {headers});
  }

  getComments(item_id:number, sort_type:string){
    let params = new HttpParams();
    
    if(sort_type) params=params.set('sort_type', sort_type)

    return this.http.get<ItemComment[]>(`${this.apiUrl}/comments/${item_id}`, {params});
  }


}