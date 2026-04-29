import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bag, BagItem, Category, Item, Order } from '../interfaces';

@Component({
  selector: 'app-bag',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css'
})
export class BagComponent {

  constructor(private apiService:MainService){}

  orders_shown:boolean = false
  bag_text:string = 'Check current orders'
  text:string = 'bag'

  categories:Category[]=[
    {
      name:"string",
      id:1,
      children:[],
      parent_id: 0
    },  {
      name:"string",
      id:1,
      children:[],
      parent_id: 0
    }
  ]

  bag:Bag={
    items:[],
    item_count: 0,
    full_price: 0
  }

  orders:Order[]=[{
    id: 0,
    items: [],
    created_at: '',
    updated_at: '',
    price: 0,
    status: ''
  }]

  ngOnInit(){
    this.getAllCategories(), 
    this.getItems()
  }
  
  getAllCategories(){
    this.apiService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }
  
  getItems(){
    this.apiService.getBagItems().subscribe({
      next: (data: Bag) => {
        this.bag = data;
        console.log('Товары успешно получены')
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  deleteItem(itemId:number){
    this.apiService.deleteItemFromBag(itemId).subscribe({
      next: (response: any) => {
        console.log('Товар удален', response)
        this.getItems()
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err)
      }
    });
  }

  postItems(){
    this.apiService.postOrder().subscribe({
      next: (response: any) => {
        console.log('Товар заказан', response)
        this.getItems()
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  showOrders(){
    if(this.orders_shown == false){
      this.orders_shown = true
      this.bag_text = 'Show your bag'
      this.text = 'orders'
      this.getOrders()
    }else{
      this.orders_shown = false
      this.bag_text = 'Check current orders'
      this.text = 'bag'
    }
    
  }

  getOrders(){
    this.apiService.getOrders().subscribe({
      next: (data: Order[]) => {
        this.orders = data;
        console.log('Заказы успешно получены')
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }
}
