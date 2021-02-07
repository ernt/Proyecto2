import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../model/Product';
import Swal from 'sweetalert2';
import {Category} from '../../model/Category';
import {ProductsService} from '../../services/products.service';
import {CategoryService} from '../../services/category.service';

declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] | any;
  categorys: Category[] | any;
  product: Product | any;
  productForm!: FormGroup;
  submitted = false;
  modalTitle!: string;
  categorySelect!: number;
  constructor(private servicioProduct: ProductsService, private servicioCategory: CategoryService , private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      status: ['', Validators.required],
      createAt: ['', Validators.required],
      categorys: [0, Validators.required]
    });

    this.getProducts();
  }
  // Consultar lista de Facturas
  getProducts(){
    this.products = [];
    this.servicioProduct.getProducts().subscribe(
      res => {
        this.products = res;
        console.log(this.products);
      },
      err => console.error(err)
    )
  }


  deleteProduct(id:number){
    Swal.fire({
      title: 'Eliminar Factura!',
      text: 'Estás seguro que deseas eliminar la Factura?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: `OK`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioProduct.deleteProduct(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'La Factura ha sido eliminada',
              'success'
            )
            this.getProducts();
          },
          err => console.error(err)
        )
      }
    });
  }

}
