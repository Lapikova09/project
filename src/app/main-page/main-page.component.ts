import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../interfaces';
import { MainService } from '../main.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, FormsModule, CommonModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPageComponent implements OnInit, AfterViewInit {

  constructor(private apiService: MainService) { }

  categories: Category[] = [];
  showSwiper = false;

  ngOnInit() {
    this.getAllCategories();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.showSwiper = true;
    }, 50);
  }

  getAllCategories() {
    this.apiService.getCategories().subscribe({
      next: (data: Category[]) => {
        console.log('Категории успешно получены с бэка:', data);
        this.categories = data;
        
        setTimeout(() => {
          this.updateSwiper();
        }, 100);
      },
      error: (err) => {
        console.error("Ошибка при получении категорий:", err);
        this.showSwiper = true;
      }
    });
  }

  updateSwiper() {
    const swiperEl = document.querySelector('swiper-container');
    if (swiperEl && swiperEl.swiper) {
      swiperEl.swiper.update();
      swiperEl.swiper.updateSize();
    }
  }

  sendCategory(caterogyId:number){
    this.apiService.sendCategoryId(caterogyId)
  }
}