import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsuario, IUsuarioParaCrear } from '../models/iusuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://backend-gestion-personal-net-production.up.railway.app';

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
  }

  getAllCustomers(): Observable<IUsuario[]> {
    return this.http.get<IUsuario[]>(`${this.apiUrl}/api/customers`);
  }

  getCustomerById(id: number): Observable<IUsuario> {
    return this.http.get<IUsuario>(`${this.apiUrl}/api/customers/${id}`);
  }

  createCustomer(customer: IUsuarioParaCrear): Observable<IUsuario> {
    return this.http.post<IUsuario>(`${this.apiUrl}/api/customers`, customer);
  }

  updateCustomer(customer: IUsuario): Observable<boolean> {
    return this.http.put<boolean>(`${this.apiUrl}/api/customers`, customer);
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/api/customers/${id}`);
  }
}
