import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Products } from '../model/Products';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  API_URI = '/products';//cambiar uri por el del microservicio
  constructor(private http: HttpClient) { }
  getProducts(){
    return this.http.get<Products[]>(this.API_URI);
  }
}
