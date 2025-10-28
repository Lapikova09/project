import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { Catalog, Category, Item } from '../interfaces';
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

  constructor(private apiService:MainService){}

  catalog:Catalog={
    items:[],
    current_page: 0,
    max_page: 0
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

  items_number:number = this.catalog.items.length
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
      next: (data: Catalog) => {
        this.catalog = data;
        this.items_number = this.catalog.items.length
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

  resetFilter(){
    this.selectedCategoryIdForChildren = null
    this.selectedCategoryId = null
    this.getAllItems()
  }
}
