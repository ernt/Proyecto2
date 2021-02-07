import {Product} from './Product';

export  class Items{
   id: number;
  quantity: number;
  price: number;
  productId: number;
  subTotal: number;
  product: Product;

  constructor(id: number, quantity: number, price: number, productId: number, subTotal: number, product: Product) {
  this.id = id;
  this.quantity = quantity;
  this.price = price;
  this.productId = productId;
  this.subTotal = subTotal;
  this.product = product;

  }



  }
