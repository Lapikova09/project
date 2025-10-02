import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { Item } from '../interfaces';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-item-page',
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule ],
  templateUrl: './item-page.component.html',
  styleUrl: './item-page.component.css'
})
export class ItemPageComponent {

  constructor(private apiService:MainService){
    this.activeId = this.apiService.activeItemId
  }

  activeId:number = 0

  item:Item = {
    id: 0,
    name: '',
    price: 0,
    info: '',
    img_url: '',
    stock: 0,
    category_id: 0,
    rating: 3
  }

  ngOnInit(){
    this.getItem()
  }

  getItem(){
    this.apiService.getItemById(this.activeId).subscribe({
      next: (data: Item) => {
        this.item = data;
        console.log("Получил");
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }
}
