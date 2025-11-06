import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../main.service';
import { Category, RegisterInfo, User } from '../interfaces';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  constructor(private apiService:MainService){
    this.token = apiService.token
  }

  login_shown:boolean = true
  register_shown:boolean = false
  code_page_shown:boolean = false
  token:string = ''
  login_email:string|null = null
  login_password:string|null = null
  register_name:string|null = null
  register_email:string|null = null
  register_password:string|null = null
  register_password_confirm:string|null = null
  code:number = 0

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

  loginData ={
    username: "pvdr260@gmail.com",
    password: "qwe"
  }

  register_info:RegisterInfo ={
      email: ``,
      password: ``,
      password_again: ``,
      name: ``
  }
  
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

  login(){
    this.apiService.login(this.loginData.password, this.loginData.username).subscribe({
      next: (response) => {
        console.log('Успешно:', response);
        this.apiService.token = response.access_token
        this.token = response.access_token
        this.getUser()
      },
      error: (error) => {
        console.error('Ошибка:', error);
      }
    });
  }

  logout(){
     this.apiService.logout().subscribe({
      next: (response) => {
        console.log('Успешно:', response);
        this.apiService.token = ''
        this.token = ''
        
      },
      error: (error) => {
        console.error('Ошибка:', error);
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

  register(){
    this.register_info ={
      email: `${this.register_email}`,
      password: `${this.register_password}`,
      password_again: `${this.register_password_confirm}`,
      name: `${this.register_name}`
    }
    this.apiService.register(this.register_info).subscribe({
      next: (response) => {
        console.log('Успешно:', response);
        this.code_page_shown = true
        this.register_shown = false
      },
      error: (error) => {
        console.error('Ошибка:', error);
      }
    });
  }

  confirm(){
    this.apiService.confirmRegister(this.register_info.email, this.code.toString()).subscribe({
      next: (response) => {
        console.log('Успешно:', response);
        this.code_page_shown = false
        this.login_shown = true
      },
      error: (error) => {
        console.error('Ошибка:', error);
      }
    });
  }
}
