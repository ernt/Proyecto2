import {Item} from './Item'
import {Client} from './Client';
import { Card } from './Card';

export class Factura {
    id?: number;
    numberInvoice?: string;
    description: string;
    customerId: number;
    createAt: Date;
    items: Item[];
    state?: string;
    customer: Client;
    card: Card;
    payMethod: string;
  // tslint:disable-next-line:max-line-length
    constructor(description: string, customerId: number, createAt: Date, items: Item[], customer: Client, card: Card, payMethod: string, state?: string, id?: number, numberInvoice?: string){
    this.id = id;
    this.numberInvoice = numberInvoice;
    this.description = description;
    this.customerId = customerId;
    this.createAt = createAt;
    this.items = items;
    this.state = state;
    this.customer = customer;
    this.card = card;
    this.payMethod = payMethod;
  }

}
