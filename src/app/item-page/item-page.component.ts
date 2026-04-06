import { Component, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MainService } from '../main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category, CommentsCatalog, Item } from '../interfaces';

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

  percentage: number = 0;
  overlayStyle: { [key: string]: string } = {};

  height: string = '60px';
  updateOverlayStyle(): void {
    let validPercentage = 100 - this.item.rating*100/5
    this.overlayStyle = {
      'width': `${validPercentage}%`,
      'background-color': '#E7E7E3',
      'height': '100%',
      'position': 'absolute',
      'top': '0',
      'right': '0',
      'z-index': '2',
      'transition': 'width 0.3s ease-in-out'
    };
  }

  activeId:number = 0
  count:number = 1
  commentsToShow:number = 3
  newComment:boolean = false
  messageForComment:string = ''
  ratingForComment:number = 0
  textForCommentButton:string = 'Show all'
  sort_type:string = 'date_desc'
  page:number = 1

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

  categories:Category[]=[
    {
      name:"asad",
      id:1,
      children:[],
      parent_id: 0
    }
  ]

  commentsCatalog:CommentsCatalog={
    all_comments_count: 0,
    current_page: 0,
    max_page: 0, 
    comments: []
  }

  ngOnInit(){
    this.getItem(),
    this.getAllCategories(),
    this.getComments()
  }

  getItem(){
    this.apiService.getItemById(this.activeId).subscribe({
      next: (data: Item) => {
        this.item = data;
        console.log("Получил");
        this.updateOverlayStyle()
      },
      error: (err) => {
        console.log(this.activeId)
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

  postItem(){
    this.apiService.postItemIntoBag(this.activeId, this.count).subscribe({
      next: (response: any) => {
        console.log("Товар добавлен в корзину:", response);
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  getComments(){
    this.apiService.getComments(this.activeId, this.sort_type, this.page).subscribe({
      next: (data) => {
        this.commentsCatalog = data;
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  showAllComments(){
    if(this.textForCommentButton == 'Show all'){
      this.commentsToShow = this.commentsCatalog.comments.length
      this.textForCommentButton = 'Hide all'
    }else{
      this.commentsToShow = 3
      this.textForCommentButton = 'Show all'
    }
  }

  showFormForNewComment(){
    this.newComment = true
  }

  addComment(){
    this.apiService.postComment(this.activeId, this.messageForComment, this.ratingForComment).subscribe({
      next: (response) => {
        console.log("Комментарий добавлен:", response);
        this.newComment = false
        this.getComments()
        this.commentsToShow = 3
        this.textForCommentButton = 'Show all'
      },
      error: (err) => {
        console.error("Ошибка при получении данных:", err);
      }
    });
  }

  sort(type:string){
    this.sort_type = type
    this.getComments()
  }

  getNextPage(){
    this.page++;
    this.getComments()
  }

  getPreviousPage(){
    this.page--;
    this.getComments()
  }
}
