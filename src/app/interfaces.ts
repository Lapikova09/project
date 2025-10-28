export interface Item{
    id:number,
    name:string,
    price:number,
    info: string,
    img_url:string,
    stock:number,
    category_id: number,
    rating:number
}

export interface User{
    id:number,
    name:string,
    email:string,
    money:number,
    created_at:string,
    role:string,
    currency: string,
    language: string
}

export interface Category{
    id:number, 
    name:string,
    parent_id: number | null; 
    children: Category[];
}

export interface BagItem{
    id: number,
    item_id: number,
    item_name: string,
    images: string,
    count: number,
    full_price: number,
    rating: number
}

export interface Catalog{
    items:Item[],
    current_page: number,
    max_page: number
}

export interface Bag{
    items:BagItem[],
    item_count: number,
    full_price: number
}