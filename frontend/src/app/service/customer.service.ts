import { Injectable } from '@angular/core';
import CustomerDTO from '../dto/CustomerDTO';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import get = Reflect.get;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  myUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public saveCustomer(dto: CustomerDTO): Observable<any> {
    return this.http.post( this.myUrl + 'customerRoute/saveCustomer', {
      CustomerName: dto.CustomerName,
      CustomerEmail: dto.CustomerEmail,
      CustomerMobile: dto.CustomerMobile,
      CustomerWork: dto.CustomerWork,
      CustomerNic: dto.CustomerNic,
      CustomerGender: dto.CustomerGender,
      CustomerRole: dto.CustomerRole,
      CustomerHiredDate: dto.CustomerHiredDate
    });
  }

  public getAllCustomers(): Observable<any> {
    return this.http.get( this.myUrl + 'customerRoute/getAllCustomers');
  }
  public  getAllCustomersSelect(): Observable<any> {
    return this.http.get(this.myUrl + 'customerRoute/getAllCustomersSelect');
  }

  public deleteCustomer(id: string): Observable<any> {
    return this.http.delete( this.myUrl + 'customerRoute/deleteCustomer', {headers: {id}});

  }
  public getCustomer(id: string): Observable<CustomerDTO> {
    return this.http.get<CustomerDTO>(this.myUrl + 'customerRoute/getCustomer/: id', {headers: {id}});
  }
}

