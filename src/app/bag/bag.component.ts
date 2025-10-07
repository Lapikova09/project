import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../interfaces';

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

  ngOnInit(){
    this.getAllCategories()
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
  
}
