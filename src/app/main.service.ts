import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category, Item, BagItem, Catalog, Bag, User, RegisterInfo, CommentsCatalog } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  apiUrl: string = 'http://localhost:8000';
  activeItemId: number = 0 

  constructor(private http: HttpClient) {}

  token:string = ''

  // фотки и слайдеры(товаров, комментариев)

  // изменение валюты и языка пользователя(новый токен, символ валюты)
  // Страницы для админа


  getItems(min_price:number|null, max_price:number|null, sort_type:string, page:number, categoryID:number|null, search_q:string|null): Observable<Catalog> {
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

    if(search_q !== null){
       params = params.set('search_q', search_q.toString());
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

  getComments(item_id:number, sort_type:string, page:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    let param = new HttpParams();
    if(sort_type) param=param.set('sort_type', sort_type)
    param=param.set('page', page)
    const options = {
      headers: headers,
      params: param
    };

    return this.http.get<CommentsCatalog>(`${this.apiUrl}/comments/${item_id}`, options);
  }

  register(register_info:RegisterInfo){
    return this.http.post(`${this.apiUrl}/register/request`, register_info, {});
  }

  confirmRegister(email:string, code:string){
    const params = new HttpParams()
      .set('email', email)
      .set('code', code);

    return this.http.post(`${this.apiUrl}/register/confirm`, {}, {params});
  }

  postComment(itemId:number, message:string, rating:number){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });
    const formData = new FormData();
    formData.append('message', message);
    formData.append('rating', `${rating}`); 

    return this.http.post(`${this.apiUrl}/comments/${itemId}`, formData, {headers});
  }

  postOrder(){
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`,
    });

    return this.http.post(`${this.apiUrl}/order/create`, {}, {headers});
  }
}