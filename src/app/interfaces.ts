export interface Item{
    id:number,
    name:string,
    price:number,
    info: string,
    img_url:string,
    stock:number,
    category_id: number
}

export interface User{
    id:number,
    name:string,
    email:string,
    age:number,
    money:number,
    created_at:string,
    role:string
}