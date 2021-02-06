import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura} from '../model/Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  API_URI = 'http://localhost:8093/invoices';//cambiar uri por el del microservicio
  constructor(private http: HttpClient) { }

  getFacturas(){
    return this.http.get<Factura[]>(this.API_URI);
  }

  getFactura(id: number) {
    return this.http.get<Factura>(this.API_URI + '/' + id);
  }



  addFactura(iditems: number,idFactura:number){
    return this.http.put(this.API_URI+'/'+iditems+'/factura/'+idFactura, null);
  }


  deleteFactura(id: number){
    return this.http.delete(this.API_URI+'/'+id);
  }

}
