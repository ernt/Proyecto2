import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura} from '../model/Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  API_URI = '/invoices';//cambiar uri por el del microservicio
  constructor(private http: HttpClient) { }

  getFacturas(){
    return this.http.get<Factura[]>(this.API_URI);
  }


  getFactura(id: number) {
    return this.http.get<Factura>(this.API_URI + '/' + id);
  }

  createFactura(factura: Factura){
    console.log(factura);
    return this.http.post(this.API_URI+'/invoices',factura);
  }
  updateFactura(factura: Factura){
    return this.http.put(this.API_URI+'/invoices/'+factura.id,factura);
  }


  deleteFactura(id: number){
    return this.http.delete(this.API_URI+'/invoices'+id);
  }

}
