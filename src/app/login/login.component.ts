import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';
import { Category } from '../interfaces';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private apiService:MainService){
    
  }

  login_shown:boolean = true
  register_shown:boolean = false

  reg(){
    this.login_shown = false
    this.register_shown = true
  }

  log(){
    this.login_shown = true
    this.register_shown = false
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
