import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Client } from '../model/Client';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  API_URI = 'http://localhost:8080/customers';
  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get<Client[]>(this.API_URI);
  }

  getCliente(id: number){
    return this.http.get<Client[]>(this.API_URI + '/' + id);
  }
}
