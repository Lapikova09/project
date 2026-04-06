import { Component } from '@angular/core';
import { Category, User } from '../interfaces';
import { MainService } from '../main.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administrator-page',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './administrator-page.component.html',
  styleUrl: './administrator-page.component.css'
})
export class AdministratorPageComponent {
  token:string = ''

  constructor(private apiService:MainService){
      this.token = apiService.token
  }

  categories:Category[]=[
  {
    name:"asad",
    id:1,
    children:[],
    parent_id: 0
  }, {
    name:"wddasds",
    id:1,
    children:[],
    parent_id: 0
  }
  ]
      
  user:User ={
    id:0,
    name:'string',
    email:'string',
    money:0,
    created_at:'string',
    role:'string',
    currency: 'string',
    language: 'string'
  }

  ngOnInit(){
    this.getAllCategories()
    if(this.token) this.getUser()
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

  getUser(){
     this.apiService.getUser().subscribe({
      next: (response) => {
        console.log('Успешно:', response);
        this.user = response
      },
      error: (error) => {
        console.error('Ошибка:', error);
      }
    });
  }
}
