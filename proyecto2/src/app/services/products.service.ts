import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Product} from '../model/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URI = 'http://localhost:8080/products';//cambiar uri por el del microservicio
  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<Product[]>(this.API_URI);
  }




  deleteProduct(id: number){
    return this.http.delete(this.API_URI+id);
  }

}

