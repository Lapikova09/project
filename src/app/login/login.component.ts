import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
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
}
