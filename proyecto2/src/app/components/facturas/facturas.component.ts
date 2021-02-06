import { Component, OnInit } from '@angular/core';
import { Factura} from '../../model/Factura';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';
import listcustomers from '/src/assets/json/customers.json';
import listinvoices from '/src/assets/json/invoice.json';
import listproducts from '/src/assets/json/products.json';
declare var $: any;


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  constructor() { }

  invoices: any = listinvoices;

  ngOnInit(): void {

  }




}
