import { Component, OnInit } from '@angular/core';
import { Factura} from '../../model/Factura';
import {Client} from '../../model/Client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';
import {ClienteService} from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { Card } from 'src/app/model/Card';
import { Product } from 'src/app/model/Product';
import { ProductsService } from 'src/app/services/products.service';
import { Item } from 'src/app/model/Item';

declare var $: any;

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.css']
})
export class FacturasComponent implements OnInit {
  facturas: Factura[] | any;
  client: Client[] | any;
  factura: Factura | any;
  cliente: Client | any;
  cards: Card[] | any
  items:Item[]|any;
  card: Card | any
  products:Product[]|any;
  productsAgregados:number[]|any;
  tipoPago!: string;
  product:Product|any;
  facturaForm!: FormGroup;
  submitted = false;
  modalTitle!: string;
  clienteSelect!: number;
  cantidad = 1;
  idProdtuc!:number;
  invoiceNumber?: string | null;
  mostRecentId?: number | null;
  constructor(private servicioFactura: FacturasService,private servicioProducto: ProductsService, private servicioCliente: ClienteService, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.facturaForm = this.formBuilder.group({
      id: [''],
      numberInvoices: ['', Validators.required],
      description: ['', Validators.required],
      customerId: ['', Validators.required],
      createAt: ['', Validators.required],
      items: ['', Validators.required],
      state: ['', Validators.required],
      customer: [0, Validators.required],
    });
    this.productsAgregados=[];
    this.getFacturas();
  }
  // Consultar lista de Facturas
  getFacturas(){
    this.facturas = [];
    this.servicioFactura.getFacturas("CREATED").subscribe(
      res => {
        this.facturas = res;
        console.log('Facturas', this.facturas);
      },
      err => console.error(err)
    )
  }

  agregarItem(){
     const ite=new Item(this.cantidad,this.product.price,this.product.id,this.cantidad*this.product.price,this.product);
     this.items.push(ite);
     this.productsAgregados.push(this.product.id);
     console.log("Item agregado:", ite)
     console.log(this.items);
     this.product=null;
     this.cantidad=1;
     this.getProductos();
     $("#selectproductsModal").modal("hide");
  }

  create(){
    this.servicioFactura.getMostRecentId().subscribe(
      res => {
        this.mostRecentId = res;
        console.log("Most recent id:", this.mostRecentId)
        if(this.mostRecentId == null) {
          var invNum = "F-" + '0'.repeat(9) + '1'
          
        } else {
          var next = this.mostRecentId + 1
          var l = next.toString()?.length;
          var invNum = "F-" + '0'.repeat(10 - l) + next.toString()
        }
        const factura=new Factura("descripcion",this.cliente.id,new Date(),this.items,this.cliente, this.card, this.tipoPago, undefined, undefined, invNum);
        this.servicioFactura.createFactura(factura).subscribe(
          res => {
            this.canceledCreate();
          },
          err => console.error(err)
        )  
      }
    )
  }

  selectProduct(id:Product){
    this.product=id;
    $("#selectproductsModal").modal("show");
  }

  selectCard(card:Card){
    this.items=[];
    this.products=[];
    this.servicioProducto.getProducts().subscribe(
      res => {
        this.products = res;
        console.log(this.products);
        this.card=card;
        $("#productsModal").modal("show");
        $("#cardsModal").modal("hide")
      },
      err => console.error(err)
    )
  }

  cerrarModal(){
    $("#selectproductsModal").modal("hide");
  }

  getProductos(){
    const result =  this.products.filter((produc: { id: any; }) => !this.productsAgregados.includes(produc.id) );
    this.products=result;
  }

  canceledCreate(){
    this.card=null;
    this.cards=[];
    this.client=[];
    this.productsAgregados=[];
    this.cliente=null;
    this.tipoPago='';
    this.cantidad=1;
    this.product=null;
  }

    // Consultar lista de Facturas
    selectCustomer(id:number,tipoPago:number){
      this.cliente = null;

      this.servicioCliente.getCliente(id).subscribe(
        res => {
          this.cliente = res;
          console.log(this.cliente);
          $("#customersModal").modal("hide");
          if (tipoPago===1) {
            this.tipoPago="tarjeta";
            this.cards=this.cliente.cards;
            $("#cardsModal").modal("show");
          } else {
            this.tipoPago="efectivo";
            $("#productsModal").modal("show");
          }
        },
        err => console.error(err)
      )
    }

  getCustomers(){
    this.client = [];
    this.servicioCliente.getClientes().subscribe(
      res => {
        this.client = res;
        console.log(this.client);
        $("#customersModal").modal("show");
      },
      err => console.error(err)
    )
  }

  deleteFactura(id:number){
    Swal.fire({
      title: 'Eliminar Factura!',
      text: 'Estás seguro que deseas eliminar la Factura?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `OK`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioFactura.deleteFactura(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'La Factura ha sido eliminada',
              'success'
            )
            this.getFacturas();
          },
          err => console.error(err)
        )
      }
    });
  }

  openModalClient(){
    console.log('entra');
    this.facturaForm.reset();
    $("#facturaModal").modal("show");
  }

}
