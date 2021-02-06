import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura} from '../model/Factura';
import { catchError } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FacturasService {
  API_URI = '../../assets/invoice.json';
  constructor(private http: HttpClient) { }

  getFacturas(){
    return this.http.get(this.API_URI);
  }

  getFactura(id: number) {
    return this.http.get(this.API_URI + '/' + id);
  }



  addFactura(iditems: number,idFactura:number){
    return this.http.put(this.API_URI+'/'+iditems+'/alumnos/'+idFactura, null);
  }


  deleteFactura(id: number){
    return this.http.delete(this.API_URI+'/'+id);
  }

}
