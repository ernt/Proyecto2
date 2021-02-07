import {Items} from "./Items";
import {Client} from "./Client";

export class Factura {
    id: number;
    numberInvoice: number;
    description: string;
    customerId: number;
    createAt: Date;
    items: Items[];
    state: string;
    customer: Client;
  // tslint:disable-next-line:max-line-length
    constructor(id: number, numberInvoice: number, description: string, customerId: number, createAt: Date, items: Items[], state: string, customer: Client){
    this.id = id;
    this.numberInvoice = numberInvoice;
    this.description = description;
    this.customerId = customerId;
    this.createAt = createAt;
    this.items = items;
    this.state = state;
    this.customer = customer;
  }

}
