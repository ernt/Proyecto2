import {Products} from './Products';

export  class Items{
   id: number;
  quantity: number;
  price: number;
  productId: number;
  subTotal: number;
  product: Products;

  constructor(id: number, quantity: number, price: number, productId: number, subTotal: number, product: Products) {
  this.id = id;
  this.quantity = quantity;
  this.price = price;
  this.productId = productId;
  this.subTotal = subTotal;
  this.product = product;

  }



  }
