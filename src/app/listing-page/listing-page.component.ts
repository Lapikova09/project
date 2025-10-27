import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { Category, Item } from '../interfaces';
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

  items_number:number = this.items.length
  //activeId:number = 0
  min_price:number|null = null
  max_price:number|null = null
  sort_type:string =''
  page:number = 1
  selectedCategoryId:number|null = null
  selectedCategoryIdForChildren:number|null = null

  ngOnInit(){
    this.getAllItems(),
    this.getAllCategories()
  }

  getAllItems(){
    this.apiService.getItems(this.min_price, this.max_price, this.sort_type, this.page, this.selectedCategoryId).subscribe({
      next: (data: Item[]) => {
        this.items = data;
        this.items_number = this.items.length
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
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

  getId(id:number){
    //this.activeId = id
    this.apiService.activeItemId = id
  }

  sort(type:string){
    this.sort_type = type
    this.getAllItems()
  }

  getNextPage(){
    this.page++;
    this.getAllItems()
  }

  getPreviousPage(){
    this.page--;
    this.getAllItems()
  }

  onCategoryChange(categoryId:number, key:string){
    if(key == 'category'){
      this.selectedCategoryIdForChildren = categoryId
    }
    this.selectedCategoryId = categoryId
    this.getAllItems()
  }
}
