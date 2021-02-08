import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Factura} from '../model/Factura';

@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  API_URI = 'http://localhost:8080/invoices';//cambiar uri por el del microservicio
  constructor(private http: HttpClient) { }

  getMostRecentId() {
    return this.http.get<number | null>(this.API_URI + '/mostRecentId')
  }

  getFacturas(state?: string){
    const options = state ?
      { params: new HttpParams().set('state', state) } : {}
    return this.http.get<Factura[]>(this.API_URI, options);
  }

  getFactura(id: number) {
    return this.http.get<Factura>(this.API_URI + '/' + id);
  }

  createFactura(factura: Factura){
    console.log(factura);
    return this.http.post(this.API_URI,factura);
  }
  updateFactura(factura: Factura){
    return this.http.put(this.API_URI+'/'+factura.id,factura);
  }


  deleteFactura(id: number){
    return this.http.delete(this.API_URI+'/'+id);
  }

}
