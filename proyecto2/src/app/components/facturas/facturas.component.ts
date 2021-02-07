import { Component, OnInit } from '@angular/core';
import { Factura} from '../../model/Factura';
import {Client} from '../../model/Client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';
import {ClienteService} from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { Cards } from 'src/app/model/Cards';
import { Products } from 'src/app/model/Products';
import { ProductsService } from 'src/app/services/products.service';
import { Items } from 'src/app/model/Items';

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
  cards: Cards[] | any
  items:Items[]|any;
  card: Cards | any
  products:Products[]|any;
  productsAgregados:number[]|any;
  tipoPago!: String;
  product:Products|any;
  facturaForm!: FormGroup;
  submitted = false;
  modalTitle!: string;
  clienteSelect!: number;
  cantidad!:number;
  idProdtuc!:number;
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

    this.getFacturas();
  }
  // Consultar lista de Facturas
  getFacturas(){
    this.facturas = [];
    this.servicioFactura.getFacturas().subscribe(
      res => {
        this.facturas = res;
        console.log('facturas');
        console.log(this.facturas);
      },
      err => console.error(err)
    )
  }
 
  agregarItem(){
     const ite=new Items(1,this.cantidad,this.product.price,this.product.id,this.cantidad*this.product.price,this.product);
     this.items.push(ite);
     this.productsAgregados.push(this.product.id);
     this.product=null;
     this.cantidad=0;
     this.getProductos();
     $("#selectproductsModal").modal("hide");
  }

  create(){
     const factura=new Factura(1,123,"descripcion",this.cliente,new Date(),this.items,"CREATED",this.cliente);
     this.servicioFactura.createFactura(factura).subscribe(
      res => {
        this.canceledCreate();
        console.log(factura);
      },
      err => console.error(err)
    )
  }

  selectProduct(id:Products){
    this.product=id;
    $("#selectproductsModal").modal("show");
  }

  selectCard(card:Cards){
    this.items=[];
    this.products=[];
    this.servicioProducto.getProducts().subscribe(
      res => {
        this.products = res;
        console.log(this.products);
        this.card=card;
        $("#productsModal").modal("show");
      },
      err => console.error(err)
    )
  }

  cerrarModal(){
    $("#selectproductsModal").modal("hide");
  }

  getProductos(){
    const result =  this.products.filter((produc: { id: any; }) => this.productsAgregados.includes(produc.id) );
    this.products=result;
  }

  canceledCreate(){
    this.card=null;
    this.cards=[];
    this.client=[];
    this.productsAgregados=[];
    this.cliente=null;
    this.tipoPago='';
    this.cantidad=0;
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
            this.tipoPago="Tarjeta";
            this.cards=this.cliente.cards;
            $("#cardsModal").modal("show");
          } else {
            this.tipoPago="Efectivo";
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
