import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bag, BagItem, Category, Item } from '../interfaces';

@Component({
  selector: 'app-bag',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './bag.component.html',
  styleUrl: './bag.component.css'
})
export class BagComponent {

  constructor(private apiService:MainService){
  
  }

  categories:Category[]=[
    {
      name:"asad",
      id:1,
      children:[],
      parent_id: 0
    },  {
      name:"wddasds",
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
    this.apiService.getBagItems(6).subscribe({
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
    this.apiService.deleteItemFromBag(itemId, 6).subscribe({
      next: (response: any) => {
        console.log('Товар удален', response)
        this.getItems()
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err)
      }
    });
  }
}
