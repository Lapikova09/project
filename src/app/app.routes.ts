import { Routes } from '@angular/router';
import { MainPageComponent } from './main-page/main-page.component';
import { ListingPageComponent } from './listing-page/listing-page.component';
import { LoginComponent } from './login/login.component';
import { BagComponent } from './bag/bag.component';
import { ItemPageComponent } from './item-page/item-page.component';

export const routes: Routes = [
    { path: '', component: MainPageComponent }, 
    { path: 'listingPage', component: ListingPageComponent }, 
    { path: 'login', component: LoginComponent }, 
    { path: 'bag', component: BagComponent }, 
    { path: 'itemPage', component: ItemPageComponent }, 
];
