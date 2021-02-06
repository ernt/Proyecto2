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

  getAlumnos(id: number){
    return this.http.get(this.API_URI+'/'+id+'/alumnos');
  }

  getAlumnosNotEvento(id: number) {
    return this.http.get(this.API_URI+'/'+id+'/not_alumnos');
  }

  updateEvento(Factura: Factura){
    return this.http.put(this.API_URI + '/' + Factura.id, Factura);
  }

  updateTipoEvento(id: number, idTipoEvento: number) {
    return this.http.put(this.API_URI + '/' + id + '/tipo_evento', idTipoEvento);
  }

  addAlumno(idEvento: number,idAlumno:number){
    return this.http.put(this.API_URI+'/'+idEvento+'/alumnos/'+idAlumno, null);
  }

  eliminarAlumno(idEvento: number,idAlumno:number){
    return this.http.delete(this.API_URI+'/'+idEvento+'/alumnos/'+idAlumno);
  }

  deleteFactura(id: number){
    return this.http.delete(this.API_URI+'/'+id);
  }

}
