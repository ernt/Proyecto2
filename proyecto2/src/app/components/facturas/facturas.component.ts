import { Component, OnInit } from '@angular/core';
import { Factura} from '../../model/Factura';
import {Client} from '../../model/Client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FacturasService } from '../../services/facturas.service';
import {ClienteService} from '../../services/cliente.service';
import Swal from 'sweetalert2';

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
        console.log(this.facturas);
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

  // onsubmit(){
  //   this.submitted = true;
  //   if(this.facturaform.invalid){
  //     console.log(this.facturaform.value);
  //     console.log('formulario inválido');
  //     return;
  //   }
  //   //this.convertimage(this);
  //   if(this.modaltitle == "registrar"){
  //     let factura = new factura(
  //       this.facturaform.controls['id'].value,
  //       this.facturaform.controls['numberinvoice'].value,
  //       this.facturaform.controls['description'].value,
  //       this.facturaform.controls['customerid'].value,
  //       this.facturaform.controls['createat'].value
  //     )
  //     console.log(this.facturaform.value);
  //     this.serviciofactura.createfactura(factura, this.facturaform.controls['customer'].value).subscribe(
  //       res => {
  //         swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'la alumno ha sido registrada',
  //           showconfirmbutton: false,
  //           timer: 1500
  //         })
  //         $("#facturamodal").modal("hide");
  //         this.getfacturas();
  //         this.submitted = false;
  //         this.clienteselect=0;
  //       },
  //       err => console.error(err)
  //     )
  //   }else{
  //     console.log(this.facturaform.value);
  //     let factura = new factura(
  //       this.facturaform.controls['id'].value,
  //       this.facturaform.controls['numberinvoice'].value,
  //       this.facturaform.controls['description'].value,
  //       this.facturaform.controls['customerid'].value,
  //       this.facturaform.controls['createat'].value,
  //       this.facturaform.controls['items'].value,
  //       this.facturaform.controls['state'].value,
  //       this.facturaform.controls['customer'].value,
  //     )
  //     this.serviciofactura.updatefactura(factura).subscribe(
  //       res => {
  //         swal.fire({
  //           position: 'top-end',
  //           icon: 'success',
  //           title: 'la alumno ha sido actualizada',
  //           showconfirmbutton: false,
  //           timer: 1500
  //         })
  //         $("#facturamodal").modal("hide");
  //         this.getfacturas();
  //         this.submitted = false;
  //       },
  //       err => {
  //         console.error(err);
  //         swal.fire({
  //           icon: 'error',
  //           title: 'oops...',
  //           text: 'error al conectar con el servidor'
  //         })
  //       }
  //     )
  //   }
  // }




}
