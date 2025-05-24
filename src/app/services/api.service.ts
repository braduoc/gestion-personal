import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'https://backend-gestion-personal-net-production.up.railway.app';

  constructor(private http: HttpClient) {
    console.log(this.apiUrl)
  }

  getAllCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/api/customers`);
  }

  getCustomerById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/customers/${id}`);
  }

  createCustomer(customer: any): Observable<boolean> {
    return this.http.post<boolean>(`${this.apiUrl}/api/customers`, customer);
  }

  updateCustomer(customer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/api/customers`, customer);
  }

  deleteCustomer(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/api/customers/${id}`);
  }
}
