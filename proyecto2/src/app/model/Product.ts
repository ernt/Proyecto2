import {Category} from './Category';

export class Product {
  id: number;
  description: string;
  stock: number;
  price: number;
  status: string;
  createAt: Date;
  categorys!: Category;

  constructor(id: number, description: string, stock: number, price: number, status: string, createAt: Date){
  this.id = id;
  this.description = description;
  this.stock = stock;
  this.price = price;
  this.status = status;
  this.createAt = createAt;




  }

}
