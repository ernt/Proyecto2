import {Category} from './Category';

export class Products {
  id: number;
  description: string;
  stock: number;
  price: number;
  status: string;
  createAt: Date;
  category: Category;

  constructor(id: number, description: string, stock: number, price: number, status: string, createAt: Date, category: Category){
  this.id = id;
  this.description = description;
  this.stock = stock;
  this.price = price;
  this.status = status;
  this.createAt = createAt;
  this.category = category;



  }

}
