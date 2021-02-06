import { Component, OnInit } from '@angular/core';
import { Factura} from '../../model/Factura';
import {Client} from '../../model/Client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';
import {ClienteService} from '../../services/cliente.service';

declare var $: any;


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] | any;
  Client: Client[] | any;
  factura: Factura | any;
  facturaForm!: FormGroup;
  submitted = false;
  modalTitle!: string;
  clienteSelect!: number;
  constructor(private servicioFactura: FacturasService, private servicioCliente: ClienteService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.facturaForm = this.formBuilder.group({
      id: [''],
      numberInvoices: ['', Validators.required],
      description: ['', Validators.required],
      customerId: ['', Validators.required],
      createAt: ['', Validators.required],
      cliente: [0, Validators.required]
    });

    this.getFacturas();
  }
  // Consultar lista de Facturas
  getFacturas(){
    this.facturas = [];
    this.servicioFactura.getFacturas().subscribe(
      res => {
        this.facturas = res;
        console.log(this.facturas);
      },
      err => console.error(err)
    )
  }



}
