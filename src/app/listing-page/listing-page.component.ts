import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { Item } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing-page',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule ],
  templateUrl: './listing-page.component.html',
  styleUrl: './listing-page.component.css',
  standalone:true
})
export class ListingPageComponent {

  constructor(private apiService:MainService){

  }

  items:Item[]=[
    {
      id: 0,
      name: 'привет',
      price: 12121,
      info: 'как дела',
      img_url: 'https://i.pinimg.com/736x/2d/3e/06/2d3e0659d1cd46aa54751f4ef7dab538.jpg',
      stock: 123,
      category_id: 0,
      rating: 2.3
    }
  ]

  items_number:number = this.items.length
  //activeId:number = 0

  ngOnInit(){
    this.getAllItems()
  }

  getAllItems(){
    this.apiService.getItems().subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.items_number = this.items.length
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  getId(id:number){
    //this.activeId = id
    this.apiService.activeItemId = id
  }
}
